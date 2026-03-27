# Use a lightweight Python image
FROM python:3.12-slim

# Set the working directory inside the container
WORKDIR /code

# Copy the requirements file and install dependencies
COPY ./requirements.txt /code/requirements.txt

# Install dependencies (We'll optimize this for PyTorch in a second)
RUN pip install --no-cache-dir -r /code/requirements.txt

# Copy the rest of your app's code
COPY . /code

# Hugging Face requires apps to run on port 7860
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=7860
EXPOSE 7860

# Initialize the database and start the server
# We use a shell command to ensure the db is created before running
CMD ["sh", "-c", "python3 -c 'from app import app, db; app.app_context().push(); db.create_all()' && python3 app.py"]