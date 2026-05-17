# Quick Start Guide

## 🚀 Get Running in 5 Minutes

### Prerequisites
- Python 3.8+
- Node.js 16+
- Terminal/Command Prompt

### Step 1: Backend Setup (2 minutes)

```bash
cd backend

# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Train the model
cd ml_model
python train_model.py
cd ..

# Start the server
python app.py
```

✅ You should see: `Running on http://127.0.0.1:5000`

### Step 2: Frontend Setup (2 minutes)

Open a **new terminal** in the project root:

```bash
cd frontend

# Install and start
npm install
npm run dev
```

✅ You should see: `Local: http://localhost:5173/`

### Step 3: Open in Browser (1 minute)

Go to: **http://localhost:5173**

🎉 You're done! Try these:
- Click "Open Dashboard" to see metrics
- Go to "Prediction" and fill the form
- Check "Analytics" for trends
- Visit "Warehouse" to manage inventory

## 📋 What You Get

| Feature | Status | Location |
|---------|--------|----------|
| Dashboard | ✅ Working | `/dashboard` |
| AI Predictions | ✅ Working | `/prediction` |
| Analytics | ✅ Working | `/analytics` |
| Warehouse | ✅ Working | `/warehouse` |
| REST API | ✅ Working | Port 5000 |
| ML Model | ✅ Trained | `backend/ml_model/model.pkl` |

## 🔧 Common Commands

```bash
# Train model again
cd backend/ml_model && python train_model.py

# Install new Python package
pip install package_name

# Install new npm package
cd frontend && npm install package_name

# Build for production
cd frontend && npm run build

# Run linting
cd frontend && npm run lint
```

## ✅ Test the API

```bash
# Check if backend is working
curl http://127.0.0.1:5000/api/health

# Make a prediction
curl -X POST http://127.0.0.1:5000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"Item_Weight":9.3,"Item_Fat_Content":"Low Fat",...}'
```

## 📚 Documentation

- **Full Setup**: See `SETUP.md`
- **Architecture**: See `ARCHITECTURE.md`
- **Complete Guide**: See `README.md`

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Module not found" | Run `pip install -r requirements.txt` |
| "Port already in use" | Change port or kill process on that port |
| "CORS error" | Make sure backend is running on 5000 |
| "Model not found" | Run `python ml_model/train_model.py` |
| "Cannot connect" | Check if both servers are running |

## 🎯 Next Steps

1. ✅ Verify everything is working
2. Explore the prediction form
3. Check the analytics dashboard
4. Try the warehouse management
5. Read ARCHITECTURE.md to understand the system
6. Customize the model with your own data

## 💡 Pro Tips

1. **Keep both terminals open** - One for backend, one for frontend
2. **Check console errors** - Open browser DevTools (F12) for frontend issues
3. **Monitor API responses** - Use Network tab in DevTools
4. **Retrain monthly** - Update model.pkl with new sales data
5. **Backup your data** - Export database.db regularly

## 📞 Need Help?

Check the **Troubleshooting** section in:
- SETUP.md (Installation issues)
- README.md (General usage)
- ARCHITECTURE.md (System design)

---

**Everything is ready! Start building! 🚀**
