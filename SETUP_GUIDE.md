# 🚀 Estato Backend Setup Guide

## Step-by-Step Setup Instructions

### 1. Prerequisites Setup

#### Install Node.js
- Download and install Node.js 18+ from [nodejs.org](https://nodejs.org/)
- Verify installation:
  ```bash
  node --version
  npm --version
  ```

#### Create Supabase Project
1. Go to [supabase.com](https://supabase.com/)
2. Sign up or login
3. Create a new project
4. Note down:
   - Project URL
   - Anon key (public)
   - Service role key (secret)

#### Create Twilio Account (for SMS/OTP)
1. Go to [twilio.com](https://www.twilio.com/)
2. Sign up for free account
3. Get your:
   - Account SID
   - Auth Token
   - Phone Number

#### Create Razorpay Account (for Payments)
1. Go to [razorpay.com](https://razorpay.com/)
2. Sign up for account
3. Get your:
   - Key ID
   - Key Secret

---

### 2. Backend Setup

#### Step 1: Install Dependencies
```bash
cd backend
npm install
```

#### Step 2: Configure Environment
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your credentials:
   ```env
   # Supabase
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

   # Twilio
   TWILIO_ACCOUNT_SID=your_account_sid
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_PHONE_NUMBER=+1234567890

   # Razorpay
   RAZORPAY_KEY_ID=your_key_id
   RAZORPAY_KEY_SECRET=your_key_secret

   # Server
   PORT=3000
   NODE_ENV=development
   ```

#### Step 3: Set Up Database
1. Go to Supabase Dashboard > SQL Editor
2. Run `database/schema.sql` to create all tables
3. Go to Supabase Dashboard > Storage
4. Create buckets (see `database/storage-setup.md`):
   - `property-images` (public)
   - `avatars` (public)

#### Step 4: Start Server
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server will run on `http://localhost:3000`

---

### 3. Flutter App Configuration

#### Step 1: Update API Base URL
Edit `lib/services/api_client.dart`:
```dart
static const String baseUrl = 'http://localhost:3000/api';
// For production: 'https://api.estato.com/api'
// For Android emulator: 'http://10.0.2.2:3000/api'
// For iOS simulator: 'http://localhost:3000/api'
```

#### Step 2: Update Config Service
Edit `lib/services/config_service.dart`:
```dart
static const String googleMapsApiKey = 'YOUR_ACTUAL_GOOGLE_MAPS_API_KEY';
```

#### Step 3: Replace AuthProvider (Optional)
To use backend authentication:
1. Rename `lib/providers/auth_provider.dart` to `lib/providers/auth_provider_demo.dart`
2. Rename `lib/providers/auth_provider_backend.dart` to `lib/providers/auth_provider.dart`
3. Update imports in `lib/main.dart`

---

### 4. Testing the Backend

#### Health Check
```bash
curl http://localhost:3000/health
```

Expected response:
```json
{
  "success": true,
  "message": "Estato API is running",
  "timestamp": "2025-11-04T..."
}
```

#### Test Registration
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123",
    "name": "Test User",
    "phone": "+91 9876543210",
    "userType": "buyer"
  }'
```

#### Test Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }'
```

---

### 5. Common Issues & Solutions

#### Issue: Cannot connect to backend
**Solution:**
- Check if server is running
- Verify PORT in `.env`
- Check firewall settings
- For Android emulator, use `10.0.2.2:3000` instead of `localhost`

#### Issue: Supabase connection error
**Solution:**
- Verify SUPABASE_URL and keys in `.env`
- Check Supabase project is active
- Verify network connection

#### Issue: CORS errors
**Solution:**
- Add your app URL to `ALLOWED_ORIGINS` in `.env`
- Restart server after changing `.env`

#### Issue: OTP not sending
**Solution:**
- Verify Twilio credentials
- Check Twilio account balance
- Verify phone number format (include country code)

#### Issue: Payment not working
**Solution:**
- Verify Razorpay credentials
- Check Razorpay account is activated
- Test in test mode first

---

### 6. Production Deployment

#### Option 1: Deploy to Heroku
1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create estato-api`
4. Set environment variables:
   ```bash
   heroku config:set SUPABASE_URL=your_url
   heroku config:set SUPABASE_ANON_KEY=your_key
   # ... etc
   ```
5. Deploy: `git push heroku main`

#### Option 2: Deploy to Railway
1. Connect GitHub repository
2. Set environment variables in Railway dashboard
3. Deploy automatically

#### Option 3: Deploy to DigitalOcean
1. Create Droplet
2. Install Node.js
3. Clone repository
4. Set up PM2: `pm2 start server.js`
5. Configure Nginx as reverse proxy

---

### 7. Monitoring & Maintenance

#### Logs
- Development: Check console output
- Production: Use PM2 logs or cloud logging

#### Database Backup
- Supabase automatically backs up database
- Manual backup: Export from Supabase dashboard

#### Performance Monitoring
- Use Supabase dashboard for database metrics
- Add APM tools (New Relic, Datadog) for production

---

## ✅ Setup Checklist

- [ ] Node.js installed
- [ ] Supabase project created
- [ ] Database schema executed
- [ ] Storage buckets created
- [ ] Environment variables configured
- [ ] Backend server running
- [ ] Health check working
- [ ] Test registration working
- [ ] Test login working
- [ ] Flutter app configured
- [ ] API client updated

---

## 📞 Support

For issues:
1. Check error logs
2. Verify environment variables
3. Test API endpoints with Postman/curl
4. Check Supabase dashboard for database issues

---

**Last Updated:** November 4, 2025

