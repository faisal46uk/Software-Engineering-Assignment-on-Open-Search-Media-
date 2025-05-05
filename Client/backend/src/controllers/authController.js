const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const pool = require('../config/db'); // Update the path if your DB config file is in a different location

// Password Strength Validator (Basic Example)
const validatePasswordStrength = (password) => {
  const minLength = 8;
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  return password.length >= minLength && regex.test(password);
};

// User Registration
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    console.log('Registration attempt:', { name, email, password });

    // Check if the user already exists
    const [existingUsers] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // Insert user into database with correct column name
    const result = await pool.query(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
      [name, email, password_hash]
    );
    console.log('User inserted:', result);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration Error:', error.message || error);
    res.status(500).json({ error: 'Server error during registration' });
  }
};

// User Login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', { email, password });

  try {
    // Check if user exists
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = users[0];

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('User found:', user);

    // Validate input and DB data
    if (!password || !user.password_hash) {
      return res.status(400).json({ error: 'Missing password or stored hash' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1d', // Token expires in 1 day
    });

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
};

// User Profile Update
exports.updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { name, email } = req.body;

  try {
    // Check if the email already exists for a different user
    const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ? AND id != ?', [email, userId]);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'Email is already in use by another user' });
    }

    // Update user details
    await pool.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [
      name,
      email,
      userId,
    ]);

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Update Profile Error:', error);
    res.status(500).json({ error: 'Server error during profile update' });
  }
};

// Logout (optional for token-based systems)
exports.logout = (req, res) => {
  res.json({ message: 'Logged out successfully (client should remove token)' });
};
