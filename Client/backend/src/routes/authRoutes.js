// server/src/routes/authRoutes.js
// const express = require('express');
// const authController = require('../controllers/authController');
// const router = express.Router();

// router.post('/register', authController.registerUser);
// router.post('/login', authController.loginUser); // We'll implement this later

// module.exports = router;


// server/src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register
router.post('/register', authController.registerUser);

// ✅ Login
router.post('/login', authController.loginUser); // <-- this must exist!

module.exports = router;
