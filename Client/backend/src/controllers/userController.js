
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const pool = require('../config/db'); // MySQL DB connection

const userController = {
  // ✅ Register New User
  registerUser: async (req, res) => {
    const { name, email, password, phone } = req.body;

    try {
      const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      if (existingUser.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await pool.query(
        'INSERT INTO users (name, email, phone, password_hash) VALUES (?, ?, ?, ?)',
        [name, email, phone, hashedPassword]
      );

      res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
      console.error('Registration error:', err);
      res.status(500).json({ message: 'Server error during registration' });
    }
  },

  // ✅ Login User
  loginUser: async (req, res) => {
    const { email, password } = req.body;

    try {
      const [userRows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      const user = userRows[0];

      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });

      res.json({
        message: 'User logged in successfully!',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ message: 'Server error during login' });
    }
  },

  // ✅ Get Profile
  getProfile: async (req, res) => {
    const userId = req.user.id;

    try {
      const [rows] = await pool.query('SELECT id, name, email, phone FROM users WHERE id = ?', [userId]);
      if (rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(rows[0]);
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ message: 'Failed to fetch profile', error });
    }
  },

  // ✅ Update Profile (with optional password update)
  updateProfile: async (req, res) => {
    const userId = req.user.id;
    const { name, email, phone, password } = req.body;

    try {
      let query = 'UPDATE users SET name = ?, email = ?, phone = ?';
      const params = [name, email, phone];

      if (password && password.trim() !== '') {
        const hashedPassword = await bcrypt.hash(password, 10);
        query += ', password_hash = ?';
        params.push(hashedPassword);
      }

      query += ' WHERE id = ?';
      params.push(userId);

      await pool.query(query, params);
      res.json({ message: 'Profile updated successfully' });
    } catch (err) {
      console.error('Profile update error:', err);
      res.status(500).json({ message: 'Server error during profile update' });
    }
  },

  // ✅ Logout
  logout: (req, res) => {
    res.json({ message: 'User logged out successfully!' });
  },
};

module.exports = userController;
