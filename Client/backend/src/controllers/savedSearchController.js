// // src/controllers/savedSearchController.js
// const db = require('../config/db');

// exports.getSavedSearches = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const [rows] = await db.execute('SELECT * FROM saved_searches WHERE user_id = ?', [userId]);
//     res.json(rows);
//   } catch (error) {
//     console.error('Error fetching saved searches:', error);
//     res.status(500).json({ message: 'Failed to get saved searches', error });
//   }
// };

// exports.saveSearch = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { term } = req.body;

//     if (!term) {
//       return res.status(400).json({ message: 'Search term is required' });
//     }

//     const [result] = await db.execute(
//       'INSERT INTO saved_searches (user_id, term) VALUES (?, ?)',
//       [userId, term]
//     );

//     res.status(201).json({ id: result.insertId, term });
//   } catch (error) {
//     console.error('Error saving search:', error);
//     res.status(500).json({ message: 'Failed to save search', error });
//   }
// };


const db = require('../config/db');

// 📥 GET saved searches for a user
exports.getSavedSearches = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await db.execute(
      'SELECT id, query AS searchTerm, filters, created_at FROM saved_searches WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );

    const parsed = rows.map(row => ({
      ...row,
      filters: row.filters ? JSON.parse(row.filters) : {},
    }));

    res.json(parsed);
  } catch (error) {
    console.error('Error fetching saved searches:', error);
    res.status(500).json({ message: 'Failed to get saved searches', error });
  }
};

// 💾 SAVE a new search (query + optional filters)
exports.saveSearch = async (req, res) => {
  try {
    const userId = req.user.id;
    const { term, filters } = req.body;

    if (!term) {
      return res.status(400).json({ message: 'Search term is required' });
    }

    const [result] = await db.execute(
      'INSERT INTO saved_searches (user_id, query, filters) VALUES (?, ?, ?)',
      [userId, term, JSON.stringify(filters || {})]
    );

    res.status(201).json({ id: result.insertId, term, filters });
  } catch (error) {
    console.error('Error saving search:', error);
    res.status(500).json({ message: 'Failed to save search', error });
  }
};
