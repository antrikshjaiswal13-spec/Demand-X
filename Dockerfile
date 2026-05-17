FROM python:3.10.13

WORKDIR /app

# Copy backend requirements
COPY backend/requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend /app/backend
COPY backend/app.py /app/app.py
COPY backend/ml_model /app/ml_model

WORKDIR /app

# Run the app
CMD gunicorn app:app --bind 0.0.0.0:$PORT
