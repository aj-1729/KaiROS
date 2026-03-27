# config.py
import os

# Paths
#AUDIO_DIR = "/home/akshaygautam4451/Kairos/dataset/MEMD_audio"
#ANNOT_DIR = "/home/akshaygautam4451/Kairos/dataset/annotations/dynamic"
#OUT_DIR = "/home/akshaygautam4451/Kairos/outputs"

#os.makedirs(OUT_DIR, exist_ok=True)

# Audio params
SAMPLE_RATE = 22050
START_TIME = 15.0        # seconds
WINDOW_SIZE = 0.5        # seconds
HOP_SIZE = 0.5           # seconds
N_MELS = 128

# Training
BATCH_SIZE = 32
EPOCHS = 50
LR = 2e-4
HIDDEN_DIM = 384
INPUT_DIM = 140