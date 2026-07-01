# Use official Python base image.
FROM python:3.11-slim

# Set working directory inside the container.
WORKDIR /app

# Copy requirements first for better caching.
COPY requirements.txt .

# Install all Python dependencies.
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend code.
COPY . .

# Expose port 8000 for the FastAPI server.
EXPOSE 8000

# Start the FastAPI server.
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]