# ✅ Render Deployment Checklist

Use this checklist to ensure everything is set up correctly for Render deployment.

---

## 📋 Pre-Deployment Checklist

### Backend Preparation
- [ ] `package.json` has `start` script: `"start": "node server.js"`
- [ ] `server.js` uses `process.env.PORT` for port
- [ ] All dependencies listed in `package.json`
- [ ] No hardcoded API keys in code
- [ ] `.env` file is in `.gitignore`
- [ ] `render.yaml` created (optional)

### GitHub Repository
- [ ] Backend code pushed to GitHub
- [ ] Repository is accessible
- [ ] `backend/` folder is in repository
- [ ] No sensitive files in repository

### Supabase Setup
- [ ] Supabase project created
- [ ] Database schema executed
- [ ] Storage buckets created
- [ ] API keys ready (anon key, service_role key)

---

## 🚀 Render Setup Checklist

### Account Setup
- [ ] Render account created
- [ ] Email verified
- [ ] GitHub account connected

### Service Creation
- [ ] Web service created
- [ ] Repository connected
- [ ] Root directory set to `backend`
- [ ] Build command: `npm install`
- [ ] Start command: `npm start`
- [ ] Region selected

### Environment Variables
- [ ] `PORT=10000` set
- [ ] `NODE_ENV=production` set
- [ ] `SUPABASE_URL` set
- [ ] `SUPABASE_ANON_KEY` set
- [ ] `SUPABASE_SERVICE_ROLE_KEY` set
- [ ] `JWT_SECRET` set
- [ ] `ALLOWED_ORIGINS` set
- [ ] Optional variables set (Twilio, Razorpay, etc.)

### Deployment
- [ ] Service deployed successfully
- [ ] Deployment status: "Live"
- [ ] No build errors
- [ ] No runtime errors
- [ ] Logs show server started

---

## ✅ Verification Checklist

### Backend Health
- [ ] Health endpoint working: `/health`
- [ ] Returns: `{"success":true,"message":"Estato API is running"}`
- [ ] Response time < 1 second

### API Endpoints
- [ ] Registration endpoint working: `POST /api/auth/register`
- [ ] Login endpoint working: `POST /api/auth/login`
- [ ] Properties endpoint working: `GET /api/properties`
- [ ] Other endpoints tested

### CORS Configuration
- [ ] CORS allows your app origin
- [ ] No CORS errors in browser console
- [ ] Preflight requests working

### Database Connection
- [ ] Supabase connection working
- [ ] Can create users
- [ ] Can query database
- [ ] Storage access working

---

## 📱 Flutter App Checklist

### Configuration
- [ ] API URL updated in `config_service.dart`
- [ ] Render URL set: `https://estato-backend.onrender.com/api`
- [ ] App tested with Render backend
- [ ] Registration working
- [ ] Login working
- [ ] All features working

### Testing
- [ ] Test on Android
- [ ] Test on iOS
- [ ] Test on Web (if applicable)
- [ ] Test on physical device
- [ ] Test all API calls

---

## 🔒 Security Checklist

### Environment Variables
- [ ] All sensitive keys in Render (not in code)
- [ ] `.env` file not in repository
- [ ] No API keys in committed files
- [ ] JWT_SECRET is strong and random

### CORS Configuration
- [ ] Only trusted origins allowed
- [ ] No wildcard (`*`) in production
- [ ] Flutter app origin added

### API Security
- [ ] Rate limiting enabled
- [ ] Input validation working
- [ ] Authentication required for protected routes
- [ ] HTTPS enabled (automatic on Render)

---

## 🌐 Custom Domain (Optional)

### Domain Setup
- [ ] Custom domain purchased
- [ ] DNS configured
- [ ] Domain added in Render
- [ ] SSL certificate issued
- [ ] Domain verified

### App Configuration
- [ ] API URL updated to custom domain
- [ ] CORS updated with custom domain
- [ ] App tested with custom domain

---

## 📊 Monitoring Checklist

### Render Dashboard
- [ ] Metrics visible (CPU, memory)
- [ ] Logs accessible
- [ ] Events tracked
- [ ] Alerts configured (optional)

### Health Monitoring
- [ ] Health check endpoint working
- [ ] Automatic restarts enabled
- [ ] Email notifications set up (optional)

---

## 🐛 Troubleshooting Checklist

### Common Issues
- [ ] Checked build logs for errors
- [ ] Checked runtime logs for errors
- [ ] Verified environment variables
- [ ] Tested database connection
- [ ] Verified CORS configuration
- [ ] Checked network connectivity

### Deployment Issues
- [ ] Build command correct
- [ ] Start command correct
- [ ] Dependencies installed
- [ ] Port configuration correct
- [ ] Node.js version compatible

---

## 📝 Notes

**Render URL:** ________________________________

**Custom Domain:** ________________________________

**Deployment Date:** ________________________________

**Issues Encountered:**
- 

**Solutions Found:**
- 

---

## 🎉 Deployment Complete!

Once all items are checked:
- ✅ Backend is live on Render
- ✅ API endpoints working
- ✅ Flutter app connected
- ✅ All features working
- ✅ Security configured

---

**Last Updated:** November 4, 2025

