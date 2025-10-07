@echo off

:: --- 1. SET UP ENVIRONMENT ---
:: Change directory to the root of your project
cd /d "C:\Users\aksha\Desktop\KaiROS"

:: Activate the virtual environment in the current window's context
call .venv\Scripts\activate.bat

:: --- 2. POPULATE DATABASE (Sequential and Fast) ---
echo Starting database population...
python populate_db.py
echo Database population finished.

:: --- 3. START BACKEND (New Window) ---
echo Starting Flask backend...
start "KaiROS Backend" cmd /k "call .venv\Scripts\activate.bat && flask run"

:: --- 4. START FRONTEND (New Window) ---
echo Starting React/Frontend...
start "KaiROS Frontend" cmd /k "cd kairos-frontend && npm start"

:: --- 5. END SCRIPT ---
echo Automation complete. Check the new windows for status.
exit