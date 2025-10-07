import os
from app import app, db, AnalyzedSong, extract_features, map_emotion, model

SONG_LIBRARY_PATH = 'song_library'

def update_library():
    """
    Safely adds new songs from the library to the database
    without deleting existing entries.
    """
    with app.app_context():
        existing_songs = [song.song_name for song in AnalyzedSong.query.all()]
        print(f"Found {len(existing_songs)} songs already in the database.")

        for filename in os.listdir(SONG_LIBRARY_PATH):
            if filename.endswith('.mp3'):
                if filename in existing_songs:
                    print(f"Skipping {filename}, already in database.")
                    continue

                file_path = os.path.join(SONG_LIBRARY_PATH, filename)
                print(f"Analyzing new song: {filename}...")

                # ... (feature extraction and prediction logic remains the same) ...
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
        print("Database update complete!")

if __name__ == '__main__':
    if model is None:
        print("Error: Model not loaded. Cannot run analysis.")
    else:
        # --- ADDED: Ensure tables are created before running ---
        with app.app_context():
            db.create_all()
            print("Database tables checked/created.")
        
        # Now call the function to add new songs
        update_library()