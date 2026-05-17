# Setup & Installation Guide

## System Requirements

- **Python**: 3.8 or higher
- **Node.js**: 16.x or higher
- **npm**: 8.x or higher
- **Git**: For version control
- **RAM**: Minimum 4GB
- **Storage**: Minimum 2GB free space

## Step-by-Step Installation

### 1. Clone the Repository

```bash
cd path/to/your/projects
git clone https://github.com/yourusername/Demand-X.git
cd Demand-X
```

### 2. Backend Setup

#### 2.1 Create Python Virtual Environment

**On Windows:**
```bash
cd backend
python -m venv venv
venv\Scripts\activate
```

**On macOS/Linux:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
```

#### 2.2 Install Dependencies

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

#### 2.3 Create Environment Configuration

```bash
cp .env.example .env
# Edit .env with your settings
```

#### 2.4 Train the ML Model

```bash
cd ml_model
python train_model.py
cd ..
```

Expected output:
```
Model RMSE: 450.23
Model R² Score: 0.9234
Model saved to ml_model/model.pkl
Feature names saved
```

#### 2.5 Start Flask Server

```bash
python app.py
```

Expected output:
```
 * Running on http://127.0.0.1:5000
 * Debug mode: on
```

### 3. Frontend Setup

#### 3.1 Install Node Dependencies

```bash
cd frontend
npm install
```

#### 3.2 Start Development Server

```bash
npm run dev
```

Expected output:
```
VITE v8.0.12  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

## Verification

### 1. Test Backend API

```bash
# In a new terminal
curl http://127.0.0.1:5000/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2024-05-16T10:30:00",
  "model_loaded": true
}
```

### 2. Test Frontend

Open browser and navigate to: `http://localhost:5173`

You should see:
- ✅ Demand-X branding
- ✅ Navigation bar with all links
- ✅ Hero section with buttons
- ✅ Features section with 3 cards

### 3. Test Prediction Endpoint

```bash
curl -X POST http://127.0.0.1:5000/api/predict \
  -H "Content-Type: application/json" \
  -d '{
    "Item_Weight": 9.3,
    "Item_Fat_Content": "Low Fat",
    "Item_Visibility": 0.016,
    "Item_Type": "Dairy",
    "Item_MRP": 249.8,
    "Outlet_Identifier": "OUT049",
    "Outlet_Establishment_Year": 1999,
    "Outlet_Size": "Medium",
    "Outlet_Location_Type": "Tier 2",
    "Outlet_Type": "Supermarket Type1",
    "Profit": 11.5
  }'
```

Expected response:
```json
{
  "predicted_sales": 3500.50,
  "timestamp": "2024-05-16T10:30:00"
}
```

## Troubleshooting

### Issue: "ModuleNotFoundError: No module named 'flask'"

**Solution:**
```bash
cd backend
pip install -r requirements.txt
```

### Issue: "Address already in use" on port 5000

**Solution (Windows):**
```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Solution (macOS/Linux):**
```bash
lsof -i :5000
kill -9 <PID>
```

### Issue: "Cannot GET /" from frontend

**Solution:** Ensure both backend and frontend servers are running:
- Backend: `http://127.0.0.1:5000`
- Frontend: `http://localhost:5173`

### Issue: CORS Error

**Solution:** Update CORS in `backend/app.py`:
```python
CORS(app, origins=['http://localhost:5173'])
```

### Issue: Model not found

**Solution:** Retrain the model:
```bash
cd backend/ml_model
python train_model.py
cd ..
```

## Development Workflow

### 1. Start Both Servers

**Terminal 1 (Backend):**
```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
python app.py
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

### 2. Access Application

- Frontend: `http://localhost:5173`
- Backend API: `http://127.0.0.1:5000`
- API Documentation: Check routes in `backend/app.py`

### 3. Make Changes

- **Backend**: Edit files in `backend/`, changes auto-reload
- **Frontend**: Edit files in `frontend/src/`, hot reload enabled

### 4. Testing

```bash
# Backend testing (add test_api.py)
cd backend
python -m pytest

# Frontend testing (if configured)
cd frontend
npm test
```

## Production Deployment

### Backend Deployment (Heroku Example)

```bash
cd backend
heroku login
heroku create demand-x-api
git push heroku main
```

### Frontend Deployment (Vercel Example)

```bash
cd frontend
npm run build
vercel
```

## Database Setup (Optional)

If using SQLite (already configured):
```bash
# Database is auto-created at backend/database.db
# No manual setup needed
```

If using PostgreSQL:
```bash
# Update .env
DATABASE_URL=postgresql://user:password@localhost:5432/demand_x

# Install psycopg2
pip install psycopg2-binary
```

## API Documentation

See `API_ENDPOINTS.md` for detailed endpoint documentation.

## Common Tasks

### Update Python Dependencies

```bash
cd backend
pip install -r requirements.txt --upgrade
```

### Update Node Dependencies

```bash
cd frontend
npm update
```

### Reset Everything

```bash
# Remove all caches and reinstall
rm -rf backend/venv backend/__pycache__ frontend/node_modules
# Then reinstall from scratch
```

### Build for Production

```bash
cd frontend
npm run build
# Output in frontend/dist/
```

## Next Steps

1. ✅ Verify installation
2. Explore dashboard at `http://localhost:5173/dashboard`
3. Test predictions at `http://localhost:5173/prediction`
4. Check analytics at `http://localhost:5173/analytics`
5. Manage warehouse at `http://localhost:5173/warehouse`

## Support

- Check README.md for detailed documentation
- Review error logs in terminal output
- Check browser console for frontend errors
- Review Flask logs for backend issues

---

**Setup Complete! Happy coding! 🚀**
