# 🔐 Environment Variables for Render

## 📋 Copy-Paste Ready Environment Variables

Use these when setting up your Render service. Copy each variable and paste into Render Dashboard → Environment Variables.

---

## ✅ Required Variables

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
⚠️ **Change this to a random string for production!**

### 7. ALLOWED_ORIGINS
```
KEY: ALLOWED_ORIGINS
VALUE: https://estato-backend.onrender.com,http://localhost:3000,http://localhost:8080
```
⚠️ **Add your Flutter app URL when you deploy it!**

---

## 🔧 Optional Variables

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

### Email (for Emails)
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
VALUE: https://estato-backend.onrender.com

KEY: SUPPORT_EMAIL
VALUE: support@estato.com

KEY: SUPPORT_PHONE
VALUE: +919876543210
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

---

## 📝 How to Add in Render

1. **Go to Render Dashboard**
   - Click on your service
   - Go to "Environment" tab

2. **Add Each Variable**
   - Click "Add Environment Variable"
   - Paste KEY and VALUE
   - Click "Save Changes"

3. **Redeploy**
   - After adding all variables
   - Click "Manual Deploy" → "Clear build cache & deploy"

---

## ⚠️ Important Notes

1. **Never commit these values** to Git
2. **Use Render's environment variables** for all sensitive data
3. **Rotate keys regularly** for security
4. **Use different keys** for production and development
5. **Update ALLOWED_ORIGINS** with your app's URL when deployed

---

## 🔒 Security Best Practices

1. **Strong JWT_SECRET**
   - Use a long, random string
   - Generate with: `openssl rand -base64 32`

2. **Restrict ALLOWED_ORIGINS**
   - Only add trusted domains
   - Don't use `*` in production

3. **Keep Keys Secret**
   - Never share in screenshots
   - Never commit to Git
   - Use Render's secure environment variables

---

## ✅ Verification

After setting all variables:

1. **Check in Render Dashboard**
   - Verify all variables are set
   - Check for typos

2. **Test Backend**
   - Health check: `/health`
   - Registration: `/api/auth/register`
   - Login: `/api/auth/login`

3. **Check Logs**
   - No errors about missing variables
   - Server starts successfully

---

**Last Updated:** November 4, 2025

