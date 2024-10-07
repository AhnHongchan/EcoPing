# python - Dockerfile
FROM python:3.9

WORKDIR /app


RUN apt-get update && \
    apt-get install -y g++ default-jdk curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install mecab
RUN curl -s https://raw.githubusercontent.com/konlpy/konlpy/master/scripts/mecab.sh | bash -s

# Copy requirements file
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code and data
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Command to run the application
CMD ["uvicorn", "textmine:app", "--host", "0.0.0.0", "--port", "8000"]