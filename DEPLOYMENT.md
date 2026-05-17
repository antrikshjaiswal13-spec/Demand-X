# Deployment Guide for Demand-X

This guide covers deploying your Demand-X application to production using Vercel (Frontend) and Railway (Backend).

## Recommended Deployment Architecture

- **Frontend**: [Vercel](https://vercel.com) - Best for React/Vite apps
- **Backend**: [Railway](https://railway.app) - Simple, powerful, Flask-friendly
- **Database**: SQLite (included) or upgrade to PostgreSQL

---

## Step 1: Deploy Backend to Railway

### Prerequisites
- Railway account (sign up at https://railway.app)
- GitHub repository with your code

### Deployment Steps

1. **Go to Railway Dashboard**
   - Visit https://railway.app/dashboard
   - Click "New Project"
   - Select "Deploy from GitHub"

2. **Connect GitHub Repository**
   - Search for `Demand-X` repository
   - Select it and authorize Railway
   - Choose the main branch

3. **Configure Environment Variables**
   In Railway dashboard, set these variables:
   ```
   FLASK_ENV=production
   SECRET_KEY=your_secret_key_here
   DATABASE_URL=sqlite:///database.db
   ```

4. **Deploy**
   - Railway will automatically detect `backend/requirements.txt`
   - Build and deployment will start automatically
   - Your backend URL will appear (e.g., `https://demand-x-backend.railway.app`)

5. **Note the Backend URL**
   - You'll need this for frontend configuration

---

## Step 2: Deploy Frontend to Vercel

### Prerequisites
- Vercel account (sign up at https://vercel.com)
- Backend URL from Step 1

### Deployment Steps

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/dashboard
   - Click "Add New..."
   - Select "Project"

2. **Import GitHub Repository**
   - Search for `Demand-X` repository
   - Click "Import"

3. **Configure Project**
   
   **Root Directory**: Leave as default (will auto-detect)
   
   **Build Settings**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Environment Variables**
   
   Add these environment variables:
   ```
   REACT_APP_API_URL=https://your-railway-backend-url
   ```
   Replace `your-railway-backend-url` with actual URL from Step 1

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your frontend will be live at a Vercel URL (e.g., `https://demand-x.vercel.app`)

---

## Step 3: Update CORS Settings (Backend)

Your Flask backend needs to allow requests from your Vercel frontend domain.

**Update `backend/app.py`:**

```python
from flask_cors import CORS

# Allow your Vercel domain
CORS(app, resources={
    r"/api/*": {
        "origins": [
            "https://your-frontend-url.vercel.app",
            "localhost:5173",
            "localhost:3000"
        ]
    }
})
```

Then push to GitHub and Railway will auto-redeploy.

---

## Step 4: Update Frontend API Calls

Make sure your frontend uses the deployed backend URL.

**Check `frontend/src/pages/Dashboard.jsx` and other API calls:**

```javascript
// ✓ Use environment variable (recommended)
const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000'

axios.get(`${API_URL}/api/dashboard`)
```

---

## Deployment Checklist

- [ ] Backend deployed to Railway
- [ ] Frontend deployed to Vercel
- [ ] Environment variables set correctly
- [ ] CORS configured for production domains
- [ ] API calls use `REACT_APP_API_URL`
- [ ] Database initialized on Railway
- [ ] ML model files uploaded to Railway
- [ ] All dependencies in `requirements.txt`
- [ ] Node modules in `.gitignore`
- [ ] `.env` not committed to git

---

## Testing Your Deployment

1. **Test Backend API**
   ```bash
   curl https://your-backend-url/api/dashboard
   ```
   Should return JSON data

2. **Test Frontend**
   - Visit your Vercel URL
   - Check browser console for errors
   - Try navigating to Dashboard page
   - Verify API calls are successful (Network tab)

---

## Troubleshooting

### Frontend shows "Cannot reach API"
- Check `REACT_APP_API_URL` in Vercel environment variables
- Verify backend URL is correct
- Check CORS settings in Flask app

### Railway build fails
- Check `backend/requirements.txt` for version conflicts
- Review Railway build logs for specific errors
- Ensure `Procfile` is in backend directory

### ML model not loading
- Verify `backend/ml_model/model.pkl` is committed to git
- Check file paths in `backend/app.py` are relative
- Ensure all pickle files exist

### Database issues
- For SQLite, it will be created automatically
- For PostgreSQL, update `DATABASE_URL` environment variable
- Run migrations if applicable

---

## Upgrading to Production Database

### Switch from SQLite to PostgreSQL

1. **In Railway, add PostgreSQL**
   - In project view, click "Add"
   - Select "PostgreSQL"
   - Railway auto-generates `DATABASE_URL`

2. **Update requirements.txt**
   Add:
   ```
   psycopg2-binary==2.9.9
   ```

3. **Update backend/app.py**
   ```python
   database_url = os.getenv('DATABASE_URL')
   if database_url.startswith('sqlite'):
        app.config['SQLALCHEMY_DATABASE_URI'] = database_url
   else:
        # PostgreSQL
        app.config['SQLALCHEMY_DATABASE_URI'] = database_url.replace('postgres://', 'postgresql://')
   ```

4. **Commit and push** - Railway will auto-redeploy with new config

---

## Performance Optimization

### Frontend (Vercel)
- ✓ Automatically optimized with Edge Functions
- ✓ Code splitting and lazy loading built-in
- ✓ Image optimization enabled

### Backend (Railway)
- ✓ Add Redis for caching
- ✓ Optimize database queries
- ✓ Use connection pooling for databases

---

## Custom Domain Setup

### Connect Domain to Vercel
1. In Vercel dashboard, go to "Domains"
2. Add your domain (e.g., `demand-x.com`)
3. Update DNS records at your domain registrar
4. Vercel will provide DNS settings

### Connect Domain to Railway (Backend)
1. Go to Railway project "Settings"
2. Add custom domain
3. Update DNS CNAME record to Railway endpoint

---

## GitHub Repository Links

- **Frontend Repository**: https://github.com/antrikshjaiswal13-spec/Demand-X
- **Production URL (after deployment)**: https://demand-x.vercel.app (or your custom domain)
- **API Documentation**: `/api/dashboard`, `/api/warehouse`, `/api/predict`

---

## Support & Monitoring

### Monitor Your Application
- **Vercel**: Dashboard shows deployment history and edge logs
- **Railway**: Real-time logs available in dashboard
- **Errors**: Check browser console (frontend) and Railway logs (backend)

### Update Your Deployment
1. Make changes locally
2. Commit to GitHub
3. Push to main branch
4. Vercel & Railway auto-redeploy within minutes

---

## Next Steps After Deployment

1. ✓ Test all features on production
2. ✓ Set up monitoring/alerting
3. ✓ Configure backups for database
4. ✓ Add HTTPS (automatic on both platforms)
5. ✓ Plan for scalability as traffic grows

---

**Questions?** Check Railway and Vercel documentation or GitHub issues.
