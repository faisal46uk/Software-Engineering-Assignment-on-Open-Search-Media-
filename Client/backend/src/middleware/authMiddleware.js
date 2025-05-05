// const jwt = require('jsonwebtoken');
// const pool = require('../config/db');

// // Middleware to protect routes
// exports.protect = async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     try {
//       token = req.headers.authorization.split(' ')[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       // Fetch user from DB (optional: exclude password if included in schema)
//       const [userRows] = await pool.query('SELECT id, name, email FROM users WHERE id = ?', [decoded.id]);
//       req.user = userRows[0];

//       if (!req.user) {
//         return res.status(401).json({ message: 'User not found' });
//       }

//       next();
//     } catch (error) {
//       console.error('Auth Middleware Error:', error);
//       res.status(401).json({ message: 'Not authorized, token failed' });
//     }
//   }

//   if (!token) {
//     return res.status(401).json({ message: 'Not authorized, no token' });
//   }
// };

const jwt = require('jsonwebtoken');
const pool = require('../config/db');

// Middleware to protect routes
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const [userRows] = await pool.query(
        'SELECT id, name, email FROM users WHERE id = ?',
        [decoded.id]
      );

      req.user = userRows[0];

      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      return next(); // ✅ ensure next is only called on success
    } catch (error) {
      console.error('Auth Middleware Error:', error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // ✅ this should only run if no token was ever provided
  return res.status(401).json({ message: 'Not authorized, no token' });
};
