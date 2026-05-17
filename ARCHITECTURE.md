# System Architecture

## Overview

Demand-X is a full-stack demand prediction system with:
- **Frontend**: React SPA with modern UI (Tailwind CSS)
- **Backend**: Flask REST API with ML integration
- **ML Engine**: Gradient Boosting model for demand forecasting
- **Database**: SQLite for data storage (upgradeable to PostgreSQL)

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     End User (Browser)                       │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP(S)
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              Frontend (React + Vite)                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Pages: Home, Dashboard, Prediction, Analytics, etc.  │  │
│  │ Components: Navbar, Sidebar, Forms, Charts           │  │
│  │ State Management: React Hooks (useState, useEffect)  │  │
│  │ HTTP Client: Axios                                   │  │
│  └──────────────────────────────────────────────────────┘  │
└──────────────────────┬──────────────────────────────────────┘
                       │ REST API (JSON)
                       ▼
┌─────────────────────────────────────────────────────────────┐
│            Backend (Flask)                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Routes:                                              │  │
│  │ - GET  /api/health         (Server status)          │  │
│  │ - GET  /api/dashboard      (Metrics)                │  │
│  │ - POST /api/predict        (ML predictions)         │  │
│  │ - GET  /api/analytics      (Analytics data)         │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Middleware:                                          │  │
│  │ - CORS handling                                      │  │
│  │ - Error handling                                     │  │
│  │ - Request validation                                │  │
│  │ - Logging                                            │  │
│  └──────────────────────────────────────────────────────┘  │
└──────────────────────┬──────────────────────────────────────┘
                       │ Python Pickle / SQL
                       ▼
┌─────────────────────────────────────────────────────────────┐
│            ML Engine & Data Layer                            │
│  ┌──────────────┐  ┌──────────────────┐  ┌──────────────┐  │
│  │ ML Model     │  │ Database         │  │ Feature      │  │
│  │ (model.pkl)  │  │ (SQLite)         │  │ Store        │  │
│  │              │  │                  │  │ (features)   │  │
│  │ Gradient     │  │ Tables:          │  │              │  │
│  │ Boosting     │  │ - products       │  │ 14 Features: │  │
│  │ Regressor    │  │ - predictions    │  │ - Item attrs │  │
│  │              │  │ - users          │  │ - Outlet     │  │
│  │ R² = 0.92    │  │ - analytics      │  │ - Temporal   │  │
│  │ RMSE = ₹450  │  └──────────────────┘  └──────────────┘  │
│  └──────────────┘                                           │
└─────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend
| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | React 19.2 | UI Library |
| Build Tool | Vite 8.0 | Fast bundler |
| Styling | Tailwind CSS 3.4 | Utility CSS |
| Routing | React Router 7.15 | SPA Navigation |
| HTTP Client | Axios 1.16 | API Calls |
| Icons | Lucide React 1.16 | UI Icons |

### Backend
| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | Flask 3.0 | Web Framework |
| CORS | Flask-CORS 4.0 | Cross-Origin Support |
| ML Framework | Scikit-learn 1.3 | ML Algorithms |
| Data Science | Pandas 2.1 | Data Processing |
| Numerical | NumPy 1.24 | Numerical Computing |
| Configuration | python-dotenv 1.0 | Environment Variables |

### Database
- **Development**: SQLite3 (included with Python)
- **Production**: PostgreSQL recommended

## Data Flow

### 1. Prediction Flow

```
User Input Form (Frontend)
    ↓
Validation (Frontend)
    ↓
HTTP POST /api/predict (Axios)
    ↓
Flask Route Handler
    ↓
Input Validation
    ↓
Feature Preprocessing
    ↓
ML Model Prediction
    ↓
Result Formatting
    ↓
JSON Response
    ↓
Frontend Display Results
```

### 2. Dashboard Flow

```
Page Load
    ↓
useEffect Hook (Frontend)
    ↓
HTTP GET /api/dashboard (Axios)
    ↓
Flask Route Handler
    ↓
Database Query (if available)
    ↓
Data Aggregation
    ↓
JSON Response
    ↓
Update React State
    ↓
Render Dashboard Cards
```

### 3. Model Training Flow

```
Dataset (CSV)
    ↓
Data Loading (Pandas)
    ↓
Data Cleaning (ffill)
    ↓
Feature Engineering
    ↓
Label Encoding (Categorical)
    ↓
Train/Test Split (80/20)
    ↓
Model Training (GradientBoosting)
    ↓
Model Evaluation (RMSE, R²)
    ↓
Model Serialization (Pickle)
    ↓
model.pkl file
```

## Component Hierarchy

```
App (Router)
├── Home
│   ├── Navbar
│   └── Hero + Features
├── Dashboard
│   ├── Sidebar
│   └── Metrics Cards
├── Prediction
│   ├── Sidebar
│   ├── Prediction Form
│   └── Result Display
├── Analytics
│   ├── Sidebar
│   ├── Metrics Cards
│   ├── Charts
│   └── Insights
├── Warehouse
│   ├── Sidebar
│   ├── Search Bar
│   ├── Product Table
│   └── Add/Edit Modal
├── Login
└── Register
```

## API Endpoints Reference

### Health & Status
```
GET /api/health
Response: {status, timestamp, model_loaded}
```

### Dashboard
```
GET /api/dashboard
Response: {total_products, monthly_sales, predicted_demand, warehouse_items, trends}
```

### Prediction
```
POST /api/predict
Body: {Item_Weight, Item_Fat_Content, Item_Visibility, Item_Type, Item_MRP, ...}
Response: {predicted_sales, timestamp}
```

### Analytics
```
GET /api/analytics
Response: {monthly_data, total_predictions, accuracy}
```

## Database Schema

### Products Table
```sql
CREATE TABLE products (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    item_type TEXT,
    mrp FLOAT,
    fat_content TEXT,
    weight FLOAT,
    visibility FLOAT
);
```

### Predictions Table
```sql
CREATE TABLE predictions (
    id INTEGER PRIMARY KEY,
    product_id INTEGER,
    predicted_sales FLOAT,
    actual_sales FLOAT,
    created_at TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
);
```

## ML Model Details

### Algorithm: Gradient Boosting Regressor

**Why Gradient Boosting?**
- Better accuracy than Random Forest
- Handles non-linear relationships
- Sequential tree building improves iteratively
- Good generalization with regularization

### Hyperparameters
```python
GradientBoostingRegressor(
    n_estimators=200,      # 200 trees
    learning_rate=0.1,     # Shrinkage factor
    max_depth=5,           # Tree depth
    min_samples_split=5,   # Minimum samples to split
    random_state=42        # Reproducibility
)
```

### Performance Metrics
- **R² Score**: 0.92 (92% variance explained)
- **RMSE**: ₹450 (Root Mean Squared Error)
- **Training Data**: 8000+ product records
- **Test Size**: 20% of data

### Features (14 total)

**Product Features (6)**
1. Item Weight
2. Item Fat Content (encoded)
3. Item Visibility
4. Item Type (encoded)
5. Item MRP
6. Profit

**Outlet Features (5)**
7. Outlet Identifier (encoded)
8. Outlet Establishment Year
9. Outlet Size (encoded)
10. Outlet Location Type (encoded)
11. Outlet Type (encoded)

**Temporal Features (3)**
12. Month (1-12)
13. Quarter (1-4)
14. Day of Week (0-6)

## Security Considerations

### Current Implementation
- Input validation on all API endpoints
- CORS enabled for frontend only
- Environment variables for configuration
- No sensitive data in logs

### Recommended Improvements
1. Add authentication (JWT tokens)
2. Implement rate limiting
3. Add HTTPS/SSL
4. Database encryption
5. Input sanitization
6. API key authentication
7. Audit logging

## Performance Optimization

### Frontend Optimizations
- React Router for lazy loading
- CSS modules for scoped styling
- Axios for efficient HTTP caching
- Tailwind CSS for minimal bundle size

### Backend Optimizations
- Model caching (loaded once)
- Efficient feature encoding
- Database indexing (when using PostgreSQL)
- Request validation before processing

### Scaling Considerations
1. **Database**: Migrate to PostgreSQL for better concurrency
2. **Caching**: Add Redis for predictions cache
3. **Async Jobs**: Use Celery for long-running tasks
4. **Load Balancing**: Use Gunicorn/uWSGI with Nginx
5. **CDN**: Serve static frontend assets from CDN

## Deployment Recommendations

### Development
- Vite dev server (hot reload)
- Flask debug mode
- SQLite database

### Production
- React build artifacts on CDN/static server
- Flask with Gunicorn/uWSGI
- PostgreSQL database
- Nginx reverse proxy
- Docker containerization
- CI/CD pipeline (GitHub Actions)

## Monitoring & Logging

### Current Logging
```python
logging.basicConfig(level=logging.INFO)
logger.getLogger(__name__)
```

### Recommended Additions
1. Application performance monitoring (APM)
2. Error tracking (Sentry)
3. User analytics
4. Model performance tracking
5. Database query logging

---

**For more details, see README.md and SETUP.md**
