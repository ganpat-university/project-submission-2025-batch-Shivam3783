# Use an official Python runtime as a base image
FROM python:3.10

# Set the working directory in the container
WORKDIR /app

# Copy the application files into the container
COPY . /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    && rm -rf /var/lib/apt/lists/*

# Install dependencies
RUN pip install --upgrade pip
COPY requirements.txt . 
RUN pip install -r requirements.txt

# Expose the port that Flask runs on
EXPOSE 5000

# Run the Flask application
CMD ["python", "app.py"]
