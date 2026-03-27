import torch
import torch.nn as nn
from config import *

class EmotionModel(nn.Module):
    def __init__(self):
        super().__init__()

        # ----------------------------
        # 2D CNN Backbone
        # ----------------------------
        self.cnn = nn.Sequential(

            # Block 1 - Upgraded to wider time-kernel (5, 3) to catch rhythm!
            nn.Conv2d(1, 32, kernel_size=(5, 3), padding=(2, 1)),
            nn.BatchNorm2d(32),
            nn.GELU(), # Upgraded
            nn.Conv2d(32, 32, kernel_size=3, padding=1),
            nn.BatchNorm2d(32),
            nn.GELU(), # Upgraded
            nn.MaxPool2d(kernel_size=(1, 2)),  # reduce frequency only
            nn.Dropout(0.2),

            # Block 2
            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.BatchNorm2d(64),
            nn.GELU(), # Upgraded
            nn.Conv2d(64, 64, kernel_size=3, padding=1),
            nn.BatchNorm2d(64),
            nn.GELU(), # Upgraded
            nn.MaxPool2d(kernel_size=(1, 2)),
            nn.Dropout(0.3),

            # Block 3
            nn.Conv2d(64, 128, kernel_size=3, padding=1),
            nn.BatchNorm2d(128),
            nn.GELU(), # Upgraded
            nn.Conv2d(128, 128, kernel_size=3, padding=1),
            nn.BatchNorm2d(128),
            nn.GELU(), # Upgraded
            nn.MaxPool2d(kernel_size=(1, 2)),
            nn.Dropout(0.3),
        )

        # ---------------------------------------
        # Dynamically compute CNN output size
        # ---------------------------------------
        with torch.no_grad():
            dummy = torch.zeros(1, 1, 10, INPUT_DIM)  # [B, C, T, F]
            dummy_out = self.cnn(dummy)
            _, C, _, F_reduced = dummy_out.shape
            self.cnn_output_dim = C * F_reduced

        print(f"[Model Init] CNN output dim: {self.cnn_output_dim}")

        # ----------------------------
        # Shared BiLSTM
        # ----------------------------
        self.lstm = nn.LSTM(
            input_size=self.cnn_output_dim,
            hidden_size=HIDDEN_DIM,
            batch_first=True,
            bidirectional=True,
            num_layers=2,
            dropout=0.3,
        )

        # LayerNorm after LSTM
        self.layer_norm = nn.LayerNorm(HIDDEN_DIM * 2)

        # ----------------------------
        # Prediction Head
        # ----------------------------
        self.head = nn.Sequential(
            nn.Linear(HIDDEN_DIM * 2, HIDDEN_DIM),
            nn.GELU(), # Upgraded here too!
            nn.Dropout(0.3),
            nn.Linear(HIDDEN_DIM, 2),
        )

    def forward(self, x):
        """
        x: [B, T, INPUT_DIM]  (INPUT_DIM = 140 for mel+chroma)
        """
        B, T, F = x.shape

        # Add channel dimension
        x = x.unsqueeze(1)          # [B, 1, T, F]

        # CNN
        x = self.cnn(x)             # [B, C, T, F']

        # Rearrange for LSTM
        x = x.permute(0, 2, 1, 3)   # [B, T, C, F']
        x = x.reshape(B, T, -1)     # [B, T, C*F']

        # BiLSTM
        h, _ = self.lstm(x)         # [B, T, 2H]

        # LayerNorm
        h = self.layer_norm(h)

        # Output
        out = self.head(h)          # [B, T, 2]

        return out, h

    def encode(self, x):
        _, h = self.forward(x)
        return h.mean(dim=1)