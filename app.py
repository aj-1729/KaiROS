from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os

#to get abs path of dir (script location)

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)

#databse config

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'database.db')

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

#initialise
db = SQLAlchemy(app)

class AnalyzedSong(db.Model):
    id = db.Column(db.Integer , primary_key = True)
    song_name = db.Column(db.String(200) , nullable = False)
    predicted_emotion = db.Column(db.String(20) , nullable = False)

    def __repr__(self):
        return f'<Sing {self.song_name} - Emotion {self.predicted_emotion}>'

@app.route("/", methods=["GET"])
def home():
    return jsonify({"msg": "Backend with Flask is working!"})

@app.route("/analyze", methods=["POST"])
def analyze():
    # check if file is in request
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    filename = file.filename

    emotion = "happy"

    new_song_Analysis = AnalyzedSong(song_name = filename , predicted_emotion = emotion)
    db.session.add(new_song_Analysis)
    db.session.commit()

    # for now, just return dummy prediction
    return jsonify({
        "song_name": filename,
        "predicted_emotion": "happy",
        "database_id" : new_song_Analysis.id 
    })

@app.route("/results", methods=["GET"])
def get_results():
    """
    This endpoint retrieves and displays all the analysis
    results currently stored in the database.
    """
    all_results = AnalyzedSong.query.all()
    results_list = []
    for result in all_results:
        results_list.append({
            "id": result.id,
            "song_name": result.song_name,
            "predicted_emotion": result.predicted_emotion
        })
    return jsonify(results_list)
