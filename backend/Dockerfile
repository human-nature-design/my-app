# This file tells Docker (and Fly.io) how to run our Python app

# Start with a Python base - this gives us Python already installed
FROM python:3.11-slim

# Set the working directory inside the container
WORKDIR /app

# Copy our requirements file first (this helps with Docker caching)
COPY requirements.txt .

# Install the Python packages we need
RUN pip install --no-cache-dir -r requirements.txt

# Copy our Python app into the container
COPY app.py .

# Tell Docker that our app will use port 8080
EXPOSE 8080

# Set the PORT environment variable that our Python app expects
ENV PORT=8080

# This is the command that runs when the container starts
CMD ["python", "app.py"] 