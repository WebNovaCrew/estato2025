# 🚀 Deploy Backend to Render - Complete Guide

## 📋 Prerequisites

- ✅ Render account (free tier available)
- ✅ Supabase account with keys
- ✅ GitHub repository with backend code
- ✅ Backend code ready

---

## 🎯 Step 1: Prepare Backend for Render

### 1.1 Verify Package.json

Make sure your `package.json` has a `start` script:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### 1.2 Update Server Port

Render automatically assigns a port via `PORT` environment variable. Your `server.js` should use:

```javascript
const PORT = process.env.PORT || 3000;
```

✅ This is already configured in your `server.js`.

### 1.3 Create render.yaml (Optional)

I've created `backend/render.yaml` for you. This is optional but recommended.

---

## 🔐 Step 2: Set Up Environment Variables

### 2.1 Required Environment Variables

You'll need to set these in Render Dashboard:

```
PORT=10000
NODE_ENV=production
SUPABASE_URL=https://yapmbzqzahsyuxxdejpq.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
JWT_SECRET=your_jwt_secret_here
ALLOWED_ORIGINS=https://your-app-domain.com,http://localhost:3000
```

### 2.2 Optional Environment Variables

```
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=your_twilio_phone
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

---

## 🚀 Step 3: Deploy to Render

### 3.1 Create Render Account

1. **Go to Render**
   - Visit: [https://render.com](https://render.com)
   - Click "Get Started for Free"
   - Sign up with GitHub (recommended)

2. **Verify Email**
   - Check your email
   - Verify your account

### 3.2 Push Backend to GitHub

1. **Push Backend Code**
   ```bash
   git add backend/
   git commit -m "Add backend for Render deployment"
   git push origin main
   ```

2. **Verify on GitHub**
   - Check your repository
   - Verify `backend/` folder is there

### 3.3 Create Web Service on Render

1. **Go to Render Dashboard**
   - Click "New +" → "Web Service"

2. **Connect Repository**
   - Select "Build and deploy from a Git repository"
   - Connect your GitHub account (if not connected)
   - Select your repository: `WebNovaCrew/Estato`
   - Click "Connect"

3. **Configure Service**
   - **Name:** `estato-backend`
   - **Environment:** `Node`
   - **Region:** Choose closest to you (e.g., `Oregon (US West)`)
   - **Branch:** `main`
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

4. **Set Environment Variables**
   - Scroll down to "Environment Variables"
   - Click "Add Environment Variable"
   - Add each variable:
     
     **Required:**
     ```
     KEY: PORT
     VALUE: 10000
     ```
     
     ```
     KEY: NODE_ENV
     VALUE: production
     ```
     
     ```
     KEY: SUPABASE_URL
     VALUE: https://yapmbzqzahsyuxxdejpq.supabase.co
     ```
     
     ```
     KEY: SUPABASE_ANON_KEY
     VALUE: your_anon_key_here
     ```
     
     ```
     KEY: SUPABASE_SERVICE_ROLE_KEY
     VALUE: your_service_role_key_here
     ```
     
     ```
     KEY: JWT_SECRET
     VALUE: your_random_jwt_secret_here
     ```
     
     ```
     KEY: ALLOWED_ORIGINS
     VALUE: https://your-app-domain.com,http://localhost:3000,https://your-render-url.onrender.com
     ```

5. **Create Service**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)

---

## ✅ Step 4: Verify Deployment

### 4.1 Check Deployment Status

1. **Monitor Deployment**
   - Go to Render Dashboard
   - Click on your service
   - Check "Events" tab for deployment progress
   - Wait for "Live" status

2. **Check Logs**
   - Click "Logs" tab
   - Should see: `🚀 Estato API Server running on port 10000`

### 4.2 Test Backend

1. **Get Your Render URL**
   - Your service URL: `https://estato-backend.onrender.com`
   - (Or your custom domain)

2. **Test Health Endpoint**
   - Open browser: `https://estato-backend.onrender.com/health`
   - Should see: `{"success":true,"message":"Estato API is running"}`

3. **Test API Endpoint**
   ```bash
   curl https://estato-backend.onrender.com/api/auth/register \
     -X POST \
     -H "Content-Type: application/json" \
     -d '{
       "email": "test@example.com",
       "password": "test123",
       "name": "Test User",
       "phone": "+91 9876543210",
       "userType": "buyer"
     }'
   ```

---

## 📱 Step 5: Update Flutter App

### 5.1 Update API URL

1. **Open Config Service**
   - File: `lib/services/config_service.dart`

2. **Update API URL**
   ```dart
   // Production (Render)
   static const String apiBaseUrl = 'https://estato-backend.onrender.com/api';
   
   // Or use your custom domain
   // static const String apiBaseUrl = 'https://api.estato.com/api';
   ```

3. **Save and Test**
   - Run your Flutter app
   - Test registration/login
   - Verify it connects to Render backend

---

## 🔧 Step 6: Configure CORS

### 6.1 Update ALLOWED_ORIGINS

1. **Get Your Flutter App URL**
   - If deploying Flutter web: `https://your-app-domain.com`
   - If using mobile: Add your app's origin

2. **Update in Render**
   - Go to Render Dashboard
   - Click your service
   - Go to "Environment" tab
   - Update `ALLOWED_ORIGINS`:
     ```
     https://your-app-domain.com,http://localhost:3000,https://estato-backend.onrender.com
     ```

3. **Redeploy**
   - Click "Manual Deploy" → "Clear build cache & deploy"

---

## 🌐 Step 7: Custom Domain (Optional)

### 7.1 Add Custom Domain

1. **Go to Render Dashboard**
   - Click your service
   - Go to "Settings" tab
   - Scroll to "Custom Domains"

2. **Add Domain**
   - Enter your domain: `api.estato.com`
   - Follow DNS configuration instructions
   - Wait for SSL certificate (automatic)

3. **Update Flutter App**
   - Update API URL to use custom domain

---

## 🔒 Step 8: Security Best Practices

### 8.1 Environment Variables

- ✅ Never commit `.env` files
- ✅ Use Render's environment variables
- ✅ Rotate keys regularly
- ✅ Use different keys for production

### 8.2 CORS Configuration

- ✅ Only allow trusted origins
- ✅ Don't use `*` in production
- ✅ Update ALLOWED_ORIGINS with your app domain

### 8.3 Rate Limiting

- ✅ Already configured in your backend
- ✅ Adjust limits in environment variables

---

## 🐛 Troubleshooting

### Deployment Fails

**Error:** "Build failed"

**Solutions:**
1. Check build logs in Render Dashboard
2. Verify `package.json` has correct scripts
3. Check Node.js version compatibility
4. Verify all dependencies are in `package.json`

### Service Won't Start

**Error:** "Service unhealthy"

**Solutions:**
1. Check logs for errors
2. Verify PORT environment variable is set
3. Check database connection
4. Verify Supabase keys are correct

### CORS Errors

**Error:** "CORS policy: No 'Access-Control-Allow-Origin'"

**Solutions:**
1. Update ALLOWED_ORIGINS in Render
2. Add your app's origin
3. Redeploy service
4. Check CORS configuration in server.js

### 401 Unauthorized

**Error:** "Invalid or expired token"

**Solutions:**
1. Verify Supabase keys in Render
2. Check database connection
3. Verify JWT_SECRET is set
4. Check authentication flow

### Service Goes to Sleep

**Issue:** Free tier services sleep after inactivity

**Solutions:**
1. Use paid tier (always on)
2. Set up health check pings
3. Use external service to ping your backend
4. Accept 30-second cold start delay

---

## 📊 Step 9: Monitor Your Backend

### 9.1 Render Dashboard

- **Metrics:** View CPU, memory usage
- **Logs:** Real-time logs
- **Events:** Deployment history
- **Settings:** Configuration

### 9.2 Health Checks

Render automatically monitors your service:
- Health check endpoint: `/health`
- Automatic restarts on failure
- Email notifications on issues

---

## 💰 Render Pricing

### Free Tier

- ✅ 750 hours/month (enough for 24/7)
- ✅ 512MB RAM
- ✅ 0.1 CPU
- ⚠️ Services sleep after 15 minutes of inactivity
- ⚠️ 30-second cold start

### Paid Tier ($7/month)

- ✅ Always on (no sleep)
- ✅ 512MB RAM
- ✅ 0.1 CPU
- ✅ Custom domains
- ✅ No cold starts

---

## ✅ Deployment Checklist

- [ ] Render account created
- [ ] Backend code pushed to GitHub
- [ ] Web service created on Render
- [ ] Environment variables set
- [ ] Service deployed successfully
- [ ] Health check working
- [ ] API endpoints working
- [ ] Flutter app updated with Render URL
- [ ] CORS configured
- [ ] Custom domain configured (optional)
- [ ] Monitoring set up

---

## 🎉 Success!

Your backend is now live on Render!

**Your Backend URL:** `https://estato-backend.onrender.com`

**Next Steps:**
1. Update Flutter app with Render URL
2. Test all API endpoints
3. Monitor performance
4. Set up custom domain (optional)
5. Configure monitoring

---

## 📞 Need Help?

- **Render Docs:** [https://render.com/docs](https://render.com/docs)
- **Render Support:** [https://render.com/support](https://render.com/support)
- **Check Logs:** Render Dashboard → Logs tab

---

**Last Updated:** November 4, 2025

