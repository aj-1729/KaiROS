from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
import numpy as np
from flask_cors import CORS

# --- NEW: Import the PyTorch Analyzer ---
from inference import EmotionAnalyzer

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
CORS(app)

# --- LOAD THE PYTORCH MODEL ON STARTUP ---
# This looks for best_model.pt in the same folder as app.py
analyzer = EmotionAnalyzer(model_path="best_model.pt")

# --- DATABASE MODEL ---
class AnalyzedSong(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    song_name = db.Column(db.String(200), nullable=False)
    predicted_emotion = db.Column(db.String(50), nullable=False)
    valence = db.Column(db.Float, nullable=False)
    arousal = db.Column(db.Float, nullable=False)

# --- MAP VALENCE/AROUSAL TO EMOTION ---
def map_emotion(valence, arousal):
    if valence >= 7 and arousal >= 7:
        return "Ecstasy / Joy"
    elif valence >= 6 and arousal >= 6:
        return "Excitement"
    elif valence >= 6 and 3.5 <= arousal <= 5.5:
        return "Content / Pleasant"
    elif valence >= 5 and arousal <= 3.5:
        return "Relaxed / Calm"
    elif 3.5 <= valence <= 5.5 and 3.5 <= arousal <= 5.5:
        return "Neutral"
    elif 3 <= valence <= 5 and arousal <= 3:
        return "Bored / Tired"
    elif valence <= 3.5 and 1.5 <= arousal <= 3.5:
        return "Sadness"
    elif valence <= 2.5 and arousal <= 2.5:
        return "Depression / Gloom"
    elif valence <= 3.5 and arousal >= 6:
        return "Fear / Anxiety"
    elif valence <= 4.5 and arousal >= 6.5:
        return "Anger / Frustration"
    elif valence <= 4.5 and 5.5 <= arousal <= 7.5:
        return "Stress / Tension"
    else:
        return "Unclassified / Mixed"

@app.route("/", methods=["GET"])  
def check():
    return jsonify({"msg" : "api is running"})   

@app.route("/analyze", methods=["POST"])
def analyze():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded."}), 400

    file = request.files["file"]
    filename = file.filename

    # 1. Save file temporarily
    temp_filepath = os.path.join(basedir, "temp_" + filename)
    file.save(temp_filepath)

    # 2. Get prediction from the PyTorch model
    analysis_result = analyzer.analyze_audio(temp_filepath)

    # 3. Delete the temporary file immediately to save space
    if os.path.exists(temp_filepath):
        os.remove(temp_filepath)

    if analysis_result is None:
        return jsonify({"error": "Could not process audio file."}), 400

    # 4. Extract averages from the dictionary returned by inference.py
    valence = analysis_result["v_avg"]
    arousal = analysis_result["a_avg"]

    # 5. Map the prediction to a single emotion word
    emotion = map_emotion(valence, arousal)
    
    # 6. Save the result to the database
    new_song_analysis = AnalyzedSong(song_name=filename, predicted_emotion=emotion, valence=valence, arousal=arousal)
    db.session.add(new_song_analysis)
    db.session.commit()
    
    return jsonify({
        "song_name": filename,
        "predicted_emotion": emotion,
        "valence": valence,
        "arousal": arousal,
        "database_id": new_song_analysis.id
    })

@app.route("/recommend", methods=["POST"])
def recommend():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded."}), 400
    
    seed_file = request.files["file"]
    filename = seed_file.filename

    # 1. Save file temporarily
    temp_filepath = os.path.join(basedir, "temp_" + filename)
    seed_file.save(temp_filepath)

    # 2. Extract features using PyTorch model
    seed_result = analyzer.analyze_audio(temp_filepath)

    # 3. Clean up temp file
    if os.path.exists(temp_filepath):
        os.remove(temp_filepath)

    if seed_result is None:
        return jsonify({"error": "Could not process uploaded audio file."}), 400

    target_valence = seed_result["v_avg"]
    target_arousal = seed_result["a_avg"]

    # 4. Calculate distances against the database
    all_songs = AnalyzedSong.query.all()
    distances = []
    for song in all_songs:
        dist = np.sqrt((song.valence - target_valence)**2 + (song.arousal - target_arousal)**2)
        distances.append((dist, song))
    
    distances.sort(key=lambda x: x[0])
    
    # 5. Build recommendations
    recommendations = []
    for dist, song in distances:
        if len(recommendations) < 5 and song.song_name != filename:
            recommendations.append({
                "song_name": song.song_name,
                "predicted_emotion": song.predicted_emotion,
            })

    return jsonify({
        "seed_song_analysis": {
            "name": filename,
            "emotion": map_emotion(target_valence, target_arousal),
            "valence": target_valence,
            "arousal": target_arousal
        },
        "recommendations": recommendations
    })

if __name__ == "__main__":
    app.run(debug=True)