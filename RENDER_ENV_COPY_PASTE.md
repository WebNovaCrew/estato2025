# 🚀 Render Environment Variables - Copy & Paste Guide

## 📋 Quick Copy-Paste Format for Render

Use this guide to easily add environment variables in Render Dashboard.

---

## ✅ REQUIRED VARIABLES (Add These First!)

Copy each variable below and paste into Render Dashboard → Environment → Add Environment Variable

### 1. PORT
```
KEY: PORT
VALUE: 10000
```

### 2. NODE_ENV
```
KEY: NODE_ENV
VALUE: production
```

### 3. SUPABASE_URL
```
KEY: SUPABASE_URL
VALUE: https://yapmbzqzahsyuxxdejpq.supabase.co
```

### 4. SUPABASE_ANON_KEY
```
KEY: SUPABASE_ANON_KEY
VALUE: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhcG1ienpxYWhzeXV4eGRlanBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1OTc5OTAsImV4cCI6MjA3ODE3Mzk5MH0.tff4ZU1_tFy2B13r0rklBVElIDTgO_ZGz1vtGFCo-kw
```

### 5. SUPABASE_SERVICE_ROLE_KEY
```
KEY: SUPABASE_SERVICE_ROLE_KEY
VALUE: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhcG1ienpxYWhzeXV4eGRlanBxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjU5Nzk5MCwiZXhwIjoyMDc4MTczOTkwfQ.jYYsxwRvg2B7ZCrn0rWykJnknwzeUUnAemSY5WLkhdk
```

### 6. JWT_SECRET
```
KEY: JWT_SECRET
VALUE: estato_jwt_secret_key_2024_secure_random_string_123456789
```

### 7. ALLOWED_ORIGINS
```
KEY: ALLOWED_ORIGINS
VALUE: https://estato2025.onrender.com,http://localhost:3000,http://localhost:8080
```

---

## 🔧 OPTIONAL VARIABLES (Add Later if Needed)

### JWT Configuration
```
KEY: JWT_EXPIRE
VALUE: 7d
```

### Rate Limiting
```
KEY: RATE_LIMIT_WINDOW_MS
VALUE: 900000

KEY: RATE_LIMIT_MAX_REQUESTS
VALUE: 100
```

### OTP Configuration
```
KEY: OTP_EXPIRE_MINUTES
VALUE: 10

KEY: OTP_LENGTH
VALUE: 6
```

### Twilio (for SMS/OTP)
```
KEY: TWILIO_ACCOUNT_SID
VALUE: your_twilio_account_sid

KEY: TWILIO_AUTH_TOKEN
VALUE: your_twilio_auth_token

KEY: TWILIO_PHONE_NUMBER
VALUE: +1234567890
```

### Razorpay (for Payments)
```
KEY: RAZORPAY_KEY_ID
VALUE: your_razorpay_key_id

KEY: RAZORPAY_KEY_SECRET
VALUE: your_razorpay_key_secret
```

### Email Configuration
```
KEY: EMAIL_HOST
VALUE: smtp.gmail.com

KEY: EMAIL_PORT
VALUE: 587

KEY: EMAIL_USER
VALUE: your_email@gmail.com

KEY: EMAIL_PASS
VALUE: your_email_password

KEY: EMAIL_FROM
VALUE: noreply@estato.com
```

### App Configuration
```
KEY: APP_NAME
VALUE: Estato

KEY: APP_URL
VALUE: https://estato2025.onrender.com

KEY: SUPPORT_EMAIL
VALUE: support@estato.com

KEY: SUPPORT_PHONE
VALUE: +919876543210
```

---

## 📝 Step-by-Step Instructions

### Step 1: Open Render Dashboard
1. Go to: [https://dashboard.render.com](https://dashboard.render.com)
2. Click on your service: **`estato2025`**

### Step 2: Go to Environment Tab
1. Click on **"Environment"** tab (in the left sidebar)
2. Scroll to **"Environment Variables"** section

### Step 3: Add Required Variables
1. Click **"Add Environment Variable"** button
2. For each required variable:
   - **KEY**: Copy the variable name (e.g., `PORT`)
   - **VALUE**: Copy the value (e.g., `10000`)
   - Click **"Save Changes"** (after adding all 7 required variables)

### Step 4: Verify and Redeploy
1. **Check all 7 required variables are added**
2. **Click "Save Changes"** (if not already saved)
3. **Wait for automatic redeploy** (or click "Manual Deploy")
4. **Check "Logs" tab** for success message:
   ```
   🚀 Estato API Server running on port 10000
   📝 Environment: production
   ```

---

## ✅ Verification Checklist

- [ ] Added `PORT=10000`
- [ ] Added `NODE_ENV=production`
- [ ] Added `SUPABASE_URL`
- [ ] Added `SUPABASE_ANON_KEY`
- [ ] Added `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Added `JWT_SECRET`
- [ ] Added `ALLOWED_ORIGINS`
- [ ] Clicked "Save Changes"
- [ ] Waited for redeploy
- [ ] Checked logs for success
- [ ] Tested health endpoint: `https://estato2025.onrender.com/health`

---

## 🧪 Test After Setup

### 1. Health Check
Visit in browser:
```
https://estato2025.onrender.com/health
```

Should return:
```json
{
  "success": true,
  "message": "Estato API is running",
  "timestamp": "2025-11-04T..."
}
```

### 2. Test Registration
```bash
curl https://estato2025.onrender.com/api/auth/register \
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

## ⚠️ Important Notes

1. **No Spaces**: Make sure there are NO spaces around the `=` sign
2. **No Quotes**: Don't add quotes around values (Render handles this)
3. **Exact Values**: Copy values exactly as shown (especially for Supabase keys)
4. **Save After Each**: You can add all variables, then click "Save Changes" once
5. **Auto-Redeploy**: After saving, Render will automatically redeploy

---

## 🐛 Troubleshooting

### Error: "Application exited early"
- ✅ Make sure ALL 7 required variables are added
- ✅ Check for typos in variable names
- ✅ Verify values are correct (no extra spaces)

### Error: "Missing Supabase configuration"
- ✅ Add `SUPABASE_URL`
- ✅ Add `SUPABASE_ANON_KEY`
- ✅ Add `SUPABASE_SERVICE_ROLE_KEY`
- ✅ Check values are correct

### Error: "Cannot connect to database"
- ✅ Verify `SUPABASE_URL` is correct
- ✅ Check Supabase project is active
- ✅ Verify keys are correct

---

## 📋 Quick Reference

**Minimum Required (7 variables):**
1. PORT
2. NODE_ENV
3. SUPABASE_URL
4. SUPABASE_ANON_KEY
5. SUPABASE_SERVICE_ROLE_KEY
6. JWT_SECRET
7. ALLOWED_ORIGINS

**File Location:**
- Full list: `backend/RENDER_ENV_VARIABLES.txt`
- This guide: `backend/RENDER_ENV_COPY_PASTE.md`

---

**Last Updated:** November 4, 2025

---

## 🚀 Quick Start

1. **Add all 7 required variables** (copy from above)
2. **Click "Save Changes"**
3. **Wait for redeploy**
4. **Test:** `https://estato2025.onrender.com/health`
5. **Done!** ✅

---

**Your backend will work after adding these 7 variables!**

