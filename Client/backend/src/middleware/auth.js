const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Expecting: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Save user data to req.user
    next(); // Proceed to route
  } catch (err) {
    console.error('Token Verification Error:', err.message);
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};

module.exports = authenticateToken;
