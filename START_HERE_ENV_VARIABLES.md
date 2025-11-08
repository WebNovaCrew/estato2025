# 🚀 START HERE: Render Environment Variables Setup

## ✅ Files Created for Easy Copy-Paste

I've created **3 files** to make it super easy to add environment variables in Render:

---

## 📁 File 1: `RENDER_ENV_QUICK_COPY.txt` ⚡

**Purpose:** Quick reference with just the 7 required variables

**Use this when:**
- You want to quickly see all required variables
- You need a simple list to copy from

**Contains:**
- 7 required variables only
- Simple format: `KEY=VALUE`

---

## 📁 File 2: `RENDER_ENV_COPY_PASTE.md` 📋

**Purpose:** Complete step-by-step guide with instructions

**Use this when:**
- You want detailed instructions
- You need to understand what each variable does
- You want troubleshooting tips

**Contains:**
- All required variables (with copy-paste format)
- All optional variables
- Step-by-step instructions
- Troubleshooting guide
- Verification checklist

---

## 📁 File 3: `RENDER_ENV_VARIABLES.txt` 📝

**Purpose:** Complete reference with all variables

**Use this when:**
- You want all variables in one place
- You need optional variables too
- You want comments and notes

**Contains:**
- All required variables
- All optional variables
- Comments and notes
- Instructions included

---

## 🎯 Quick Start: Add Variables to Render

### Step 1: Open Render Dashboard
1. Go to: [https://dashboard.render.com](https://dashboard.render.com)
2. Click on your service: **`estato2025`**

### Step 2: Go to Environment Tab
1. Click **"Environment"** tab (left sidebar)
2. Scroll to **"Environment Variables"** section

### Step 3: Add Required Variables

**Open:** `backend/RENDER_ENV_QUICK_COPY.txt`

**Add these 7 variables one by one:**

1. **PORT** = `10000`
2. **NODE_ENV** = `production`
3. **SUPABASE_URL** = `https://yapmbzqzahsyuxxdejpq.supabase.co`
4. **SUPABASE_ANON_KEY** = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhcG1ienpxYWhzeXV4eGRlanBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1OTc5OTAsImV4cCI6MjA3ODE3Mzk5MH0.tff4ZU1_tFy2B13r0rklBVElIDTgO_ZGz1vtGFCo-kw`
5. **SUPABASE_SERVICE_ROLE_KEY** = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhcG1ienpxYWhzeXV4eGRlanBxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjU5Nzk5MCwiZXhwIjoyMDc4MTczOTkwfQ.jYYsxwRvg2B7ZCrn0rWykJnknwzeUUnAemSY5WLkhdk`
6. **JWT_SECRET** = `estato_jwt_secret_key_2024_secure_random_string_123456789`
7. **ALLOWED_ORIGINS** = `https://estato2025.onrender.com,http://localhost:3000,http://localhost:8080`

**For each variable:**
- Click **"Add Environment Variable"**
- Paste **KEY** name
- Paste **VALUE**
- Click **"Save Changes"** (after adding all 7)

### Step 4: Verify and Test

1. **Check all 7 variables are added**
2. **Wait for automatic redeploy**
3. **Check "Logs" tab** for:
   ```
   🚀 Estato API Server running on port 10000
   ```
4. **Test:** `https://estato2025.onrender.com/health`

---

## 📋 Required Variables List

### Minimum Required (7 variables):

| Variable | Value |
|----------|-------|
| `PORT` | `10000` |
| `NODE_ENV` | `production` |
| `SUPABASE_URL` | `https://yapmbzqzahsyuxxdejpq.supabase.co` |
| `SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `JWT_SECRET` | `estato_jwt_secret_key_2024_secure_random_string_123456789` |
| `ALLOWED_ORIGINS` | `https://estato2025.onrender.com,http://localhost:3000,http://localhost:8080` |

---

## 🔧 Optional Variables

Add these later if you need:
- Twilio (SMS/OTP)
- Razorpay (Payments)
- Email (Notifications)
- Rate Limiting (Custom settings)
- OTP Configuration (Custom settings)

**See:** `RENDER_ENV_COPY_PASTE.md` for full list

---

## ✅ Verification Checklist

After adding variables:

- [ ] All 7 required variables added
- [ ] Clicked "Save Changes"
- [ ] Waited for redeploy
- [ ] Checked logs for success
- [ ] Tested health endpoint
- [ ] No errors in logs

---

## 🐛 Troubleshooting

### "Application exited early"
- ✅ Add all 7 required variables
- ✅ Check for typos
- ✅ Verify values are correct

### "Missing Supabase configuration"
- ✅ Add Supabase variables
- ✅ Check values are correct

### Need more help?
- See: `RENDER_ENV_COPY_PASTE.md` for detailed troubleshooting

---

## 📚 File Reference

1. **Quick Copy:** `backend/RENDER_ENV_QUICK_COPY.txt`
2. **Complete Guide:** `backend/RENDER_ENV_COPY_PASTE.md`
3. **Full Reference:** `backend/RENDER_ENV_VARIABLES.txt`

---

## 🚀 Next Steps

1. ✅ **Add all 7 required variables** in Render
2. ✅ **Save and wait for redeploy**
3. ✅ **Test health endpoint**
4. ✅ **Check logs for success**
5. ✅ **Start using your API!**

---

**Your backend will work after adding these 7 variables!**

**Last Updated:** November 4, 2025

