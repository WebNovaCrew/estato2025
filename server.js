const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Check for required environment variables before importing routes
const requiredEnvVars = ['SUPABASE_URL', 'SUPABASE_ANON_KEY'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables!');
  console.error(`Missing: ${missingEnvVars.join(', ')}`);
  console.error('');
  console.error('📝 To fix this:');
  console.error('   1. Go to Render Dashboard → Your Service → Environment Tab');
  console.error('   2. Add the following environment variables:');
  console.error('      - PORT=10000');
  console.error('      - NODE_ENV=production');
  console.error('      - SUPABASE_URL');
  console.error('      - SUPABASE_ANON_KEY');
  console.error('      - SUPABASE_SERVICE_ROLE_KEY');
  console.error('      - JWT_SECRET');
  console.error('      - ALLOWED_ORIGINS');
  console.error('   3. Save changes and redeploy');
  console.error('');
  console.error('See: backend/RENDER_ENV_COPY_PASTE.md for detailed instructions');
  process.exit(1);
}

// Import routes (only after env vars are verified)
let authRoutes, otpRoutes, userRoutes, propertyRoutes, favoriteRoutes;
let chatRoutes, bookingRoutes, paymentRoutes, adminRoutes, notificationRoutes;

try {
  authRoutes = require('./routes/auth');
  otpRoutes = require('./routes/otp');
  userRoutes = require('./routes/users');
  propertyRoutes = require('./routes/properties');
  favoriteRoutes = require('./routes/favorites');
  chatRoutes = require('./routes/chats');
  bookingRoutes = require('./routes/bookings');
  paymentRoutes = require('./routes/payments');
  adminRoutes = require('./routes/admin');
  notificationRoutes = require('./routes/notifications');
} catch (error) {
  console.error('❌ Error loading routes:', error.message);
  console.error('');
  console.error('This is likely due to missing environment variables.');
  console.error('Please check Render Dashboard → Environment Variables.');
  process.exit(1);
}

// Initialize Express app
const app = express();
// Render automatically sets PORT, fallback to 3000 for local development
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Security headers
app.use(compression()); // Compress responses
app.use(morgan('dev')); // Logging

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:3000', 'http://localhost:8080'];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // 100 requests per window
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later.',
  },
});

app.use('/api/', limiter);

// Health check route
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Estato API is running',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api/users', userRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/notifications', notificationRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);

  // Multer errors
  const multer = require('multer');
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        error: 'File size too large. Maximum size is 5MB.',
      });
    }
  }

  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// Start server with error handling
try {
  app.listen(PORT, () => {
    console.log(`🚀 Estato API Server running on port ${PORT}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/health`);
    console.log(`✅ Server started successfully!`);
  });
} catch (error) {
  console.error('❌ Failed to start server:', error.message);
  console.error('Stack trace:', error.stack);
  process.exit(1);
}

module.exports = app;

