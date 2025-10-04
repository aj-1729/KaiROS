from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
import librosa
import numpy as np
import joblib

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# --- LOAD THE ML MODEL ON STARTUP ---
# NOTE: The filename is now 'deam_valence_arousal_rf.joblib'
try:
    model = joblib.load('deam_valence_arousal_rf.joblib')
    print("Model loaded successfully!")
except FileNotFoundError:
    model = None
    print("Error: Model file 'deam_valence_arousal_rf.joblib' not found.")

# --- DATABASE MODEL ---
class AnalyzedSong(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    song_name = db.Column(db.String(200), nullable=False)
    predicted_emotion = db.Column(db.String(50), nullable=False)

# --- NEW: FEATURE EXTRACTION (COPIED FROM NOTEBOOK) ---
def extract_features(file_path, duration=30, sample_rate=22050):
    """Extract features from one audio file."""
    try:
        y, sr = librosa.load(file_path, sr=sample_rate, duration=duration)
        mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
        chroma = librosa.feature.chroma_stft(y=y, sr=sr)
        spec_contrast = librosa.feature.spectral_contrast(y=y, sr=sr)
        tempo, _ = librosa.beat.beat_track(y=y, sr=sr) # Use beat_track for single tempo value
        
        feat = np.hstack([
            mfcc.mean(axis=1),
            chroma.mean(axis=1),
            spec_contrast.mean(axis=1),
            tempo
        ])
        return feat
    except Exception as e:
        print("Error in feature extraction:", e)
        return None

# --- IMPROVED: MAP VALENCE/AROUSAL TO EMOTION ---
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
    if model is None:
        return jsonify({"error": "Model is not loaded."}), 500
        
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded."}), 400

    file = request.files["file"]
    filename = file.filename

    # 1. Extract features from the file object
    features = extract_features(file)
    if features is None:
        return jsonify({"error": "Could not process audio file."}), 400

    # 2. Get prediction (valence, arousal) from the model
    features_reshaped = features.reshape(1, -1)
    valence_arousal = model.predict(features_reshaped)
    valence = valence_arousal[0][0]
    arousal = valence_arousal[0][1]

    # 3. Map the prediction to a single emotion word
    emotion = map_emotion(valence, arousal)
    
    # 4. Save the result to the database
    new_song_analysis = AnalyzedSong(song_name=filename, predicted_emotion=emotion)
    db.session.add(new_song_analysis)
    db.session.commit()
    
    return jsonify({
        "song_name": filename,
        "predicted_emotion": emotion,
        "valence": float(valence),
        "arousal": float(arousal),
        "database_id": new_song_analysis.id
    })