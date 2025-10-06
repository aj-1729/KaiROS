import os
from app import app, db, AnalyzedSong, extract_features, map_emotion, model

SONG_LIBRARY_PATH = 'song_library'

def analyze_and_populate():
    with app.app_context():
        db.session.query(AnalyzedSong).delete()
        db.session.commit()
        print("Cleared old database entries.")

        for filename in os.listdir(SONG_LIBRARY_PATH):
            if filename.endswith('.mp3'):
                file_path = os.path.join(SONG_LIBRARY_PATH, filename)
                print(f"Analyzing {filename}...")

                features = extract_features(file_path)
                if features is None:
                    continue

                features_reshaped = features.reshape(1, -1)
                valence_arousal = model.predict(features_reshaped)
                valence = float(valence_arousal[0][0])
                arousal = float(valence_arousal[0][1])
                emotion = map_emotion(valence, arousal)

                new_song = AnalyzedSong(
                    song_name=filename, file_path=file_path,
                    predicted_emotion=emotion, valence=valence, arousal=arousal
                )
                db.session.add(new_song)

        db.session.commit()
        print("Database populated successfully!")

if __name__ == '__main__':
    if model is None:
        print("Error: Model not loaded. Cannot run analysis.")
    else:
        analyze_and_populate()