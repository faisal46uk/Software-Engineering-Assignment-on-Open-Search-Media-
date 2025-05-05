require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const pool = require('./config/db'); // DB pool for MySQL

// --- Import Routes ---
const authRoutes = require('./routes/authRoutes'); // Auth routes
const userRoutes = require('./routes/userRoutes'); // Register, login, update, dashboard
const searchAndSavedRoutes = require('./routes/savedSearchRoutes'); // Search + Saved
const protectedRoutes = require('./routes/protectedRoutes'); // Misc protected
const savedSearchRoutes = require('./routes/savedSearchRoutes');

// --- Middleware ---
const { protect } = require('./middleware/authMiddleware'); // JWT protect middleware

// --- App Initialization ---
const app = express();
const PORT = process.env.PORT || 5001;

// --- Core Middleware ---
app.use(cors());
app.use(express.json());

// --- Public API Routes ---
app.use('/api/auth', authRoutes);         // e.g., /api/auth/login
app.use('/api/user', userRoutes);         // e.g., /api/user/register, /update, /dashboard

// --- Protected API Routes ---
app.use('/api/search', searchAndSavedRoutes); // Original route for search
app.use('/api/saved-searches', searchAndSavedRoutes); // New alias for frontend to fetch saved searches

app.use('/api/protected', protectedRoutes); // Other protected routes
app.use('/api/search', savedSearchRoutes);

// --- Public Test Route ---
app.get('/api/test', (req, res) => {
  res.json({ message: '✅ Public backend test route is running!' });
});

// --- Protected Test Route ---
app.get('/api/protected-test', protect, (req, res) => {
  res.json({ message: '🔐 This is a directly protected test route', user: req.user });
});

// --- Global Error Handler ---
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.stack || err);
  res.status(err.status || 500).json({
    error: 'Server Error',
    message: err.message || 'Unexpected error occurred',
  });
});

// --- Start the Server ---
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);

  // Check DB connection
  pool.query('SELECT 1')
    .then(() => console.log('✅ Database connection verified.'))
    .catch(err => {
      console.error('❌ Database connection failed:', err);
      process.exit(1);
    });
});
