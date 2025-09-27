from flask import Flask, request, jsonify

app = Flask(__name__)

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

    # for now, just return dummy prediction
    return jsonify({
        "song_name": filename,
        "predicted_emotion": "happy"
    })
