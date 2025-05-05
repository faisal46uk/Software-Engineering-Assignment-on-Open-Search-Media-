

// const express = require('express');
// const router = express.Router();
// const { protect } = require('../middleware/authMiddleware'); // ✅ JWT middleware
// const userController = require('../controllers/userController'); // ✅ User controller

// // ✅ Protected Route: Dashboard
// router.get('/dashboard', protect, (req, res) => {
//   res.json({ message: 'Welcome to your dashboard!', user: req.user });
// });

// // ✅ Public Routes
// router.post('/register', userController.registerUser); // Rename to match controller
// router.post('/login', userController.loginUser);

// // ✅ Protected Routes
// router.put('/update', protect, userController.updateProfile);
// router.get('/logout', protect, userController.logout); // Optional

// module.exports = router;

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // ✅ JWT middleware
const userController = require('../controllers/userController'); // ✅ User controller

// ✅ Protected Route: Dashboard
router.get('/dashboard', protect, (req, res) => {
  res.json({ message: 'Welcome to your dashboard!', user: req.user });
});

// ✅ Public Routes
router.post('/register', userController.registerUser); // Register new user
router.post('/login', userController.loginUser); // Login user

// ✅ Protected Routes
router.put('/update', protect, userController.updateProfile); // Update user profile
router.get('/profile', protect, userController.getProfile); // Get user profile
router.get('/logout', protect, userController.logout); // Optional logout route

module.exports = router;




