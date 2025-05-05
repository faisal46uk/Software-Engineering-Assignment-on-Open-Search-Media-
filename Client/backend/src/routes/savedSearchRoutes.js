// const express = require('express');
// const router = express.Router();
// const axios = require('axios');
// const pool = require('../config/db');
// const { protect } = require('../middleware/authMiddleware');

// // --- Openverse Search Proxy Route ---
// router.get('/openverse', protect, async (req, res) => {
//   const { q } = req.query;

//   if (!q) {
//     return res.status(400).json({ error: 'Search query parameter "q" is required' });
//   }

//   try {
//     console.log(`User ${req.user.id} searching Openverse for: ${q}`);

//     const openverseApiUrl = 'https://api.openverse.org/v1/images/';
//     const response = await axios.get(openverseApiUrl, {
//       params: { q },
//       timeout: 10000,
//     });

//     res.json(response.data);
//   } catch (err) {
//     console.error('Openverse Error:', err?.response?.status || 500, err?.response?.data || err.message);
//     res.status(err?.response?.status || 500).json({
//       error: 'Openverse API request failed',
//       details: err?.response?.data?.detail || err.message || 'Unknown error occurred',
//     });
//   }
// });

// // --- Save a Search Term ---
// router.post('/saved-searches', protect, async (req, res) => {
//   const { searchTerm, filters } = req.body;

//   if (!searchTerm) {
//     return res.status(400).json({ error: 'Search term is required' });
//   }

//   try {
//     const query = `
//       INSERT INTO saved_searches (user_id, query, filters)
//       VALUES (?, ?, ?)
//     `;
//     await pool.query(query, [req.user.id, searchTerm, JSON.stringify(filters || {})]);

//     res.status(201).json({ message: 'Search saved successfully', searchTerm, filters });
//   } catch (err) {
//     console.error('Error saving search:', err);
//     res.status(500).json({ error: 'Failed to save search', details: err.message });
//   }
// });

// // --- Get Saved Searches ---
// router.get('/saved-searches', protect, async (req, res) => {
//   try {
//     const query = `
//       SELECT id, query AS searchTerm, filters, created_at AS createdAt
//       FROM saved_searches
//       WHERE user_id = ?
//       ORDER BY created_at DESC
//     `;
//     const [savedSearches] = await pool.query(query, [req.user.id]);

//     const parsedSearches = savedSearches.map((search) => ({
//       ...search,
//       filters: search.filters ? JSON.parse(search.filters) : {},
//     }));

//     res.json({ message: 'Fetched saved searches', savedSearches: parsedSearches });
//   } catch (err) {
//     console.error('Error retrieving saved searches:', err);
//     res.status(500).json({ error: 'Failed to retrieve saved searches', details: err.message });
//   }
// });

// // --- Delete a Saved Search ---
// router.delete('/saved-searches/:id', protect, async (req, res) => {
//   const { id } = req.params;

//   try {
//     const query = `
//       DELETE FROM saved_searches
//       WHERE id = ? AND user_id = ?
//     `;
//     const [result] = await pool.query(query, [id, req.user.id]);

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: 'Saved search not found or unauthorized' });
//     }

//     res.json({ message: `Deleted saved search with id: ${id}` });
//   } catch (err) {
//     console.error('Error deleting saved search:', err);
//     res.status(500).json({ error: 'Failed to delete saved search', details: err.message });
//   }
// });

// module.exports = router;



const express = require('express');
const router = express.Router();
const axios = require('axios');
const pool = require('../config/db');
const { protect } = require('../middleware/authMiddleware');

// --- Openverse Search Proxy Route ---
router.get('/openverse', protect, async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Search query parameter "q" is required' });
  }

  try {
    console.log(`User ${req.user.id} searching Openverse for: ${q}`);

    const openverseApiUrl = 'https://api.openverse.org/v1/images/';
    const response = await axios.get(openverseApiUrl, {
      params: { q },
      timeout: 10000,
    });

    // Automatically save search if successful
    const query = 'INSERT INTO saved_searches (user_id, query, filters) VALUES (?, ?, ?)';
    await pool.query(query, [req.user.id, q, JSON.stringify({})]);

    res.json(response.data);
  } catch (err) {
    const statusCode = err?.response?.status || 500;
    const errorDetails = err?.response?.data || err.message || 'Unknown error occurred';

    console.error('Openverse Error:', statusCode, errorDetails);
    res.status(statusCode).json({
      error: 'Openverse API request failed',
      details: errorDetails,
    });
  }
});

// --- Save a Search Term ---
router.post('/saved-searches', protect, async (req, res) => {
  const { searchTerm, filters } = req.body;

  if (!searchTerm) {
    return res.status(400).json({ error: 'Search term is required' });
  }

  try {
    const query = 'INSERT INTO saved_searches (user_id, query, filters) VALUES (?, ?, ?)';
    await pool.query(query, [req.user.id, searchTerm, JSON.stringify(filters || {})]);

    res.status(201).json({ message: 'Search saved successfully', searchTerm, filters });
  } catch (err) {
    console.error('Error saving search:', err);
    res.status(500).json({ error: 'Failed to save search', details: err.message });
  }
});

// --- Get Saved Searches ---
router.get('/saved-searches', protect, async (req, res) => {
  try {
    const query = 
      'SELECT id, query AS searchTerm, filters, created_at AS createdAt FROM saved_searches WHERE user_id = ? ORDER BY created_at DESC';
    const [savedSearches] = await pool.query(query, [req.user.id]);

    const parsedSearches = savedSearches.map((search) => {
      try {
        return {
          ...search,
          filters: search.filters ? JSON.parse(search.filters) : {},
        };
      } catch (parseError) {
        console.error('Error parsing filters:', parseError);
        return { ...search, filters: {} };  // Default to empty object if parsing fails
      }
    });

    res.json({ message: 'Fetched saved searches', savedSearches: parsedSearches });
  } catch (err) {
    console.error('Error retrieving saved searches:', err);
    res.status(500).json({ error: 'Failed to retrieve saved searches', details: err.message });
  }
});

// --- Delete a Saved Search ---
router.delete('/saved-searches/:id', protect, async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM saved_searches WHERE id = ? AND user_id = ?';
    const [result] = await pool.query(query, [id, req.user.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Saved search not found or unauthorized' });
    }

    res.json({ message: `Deleted saved search with id: ${id}` });
  } catch (err) {
    console.error('Error deleting saved search:', err);
    res.status(500).json({ error: 'Failed to delete saved search', details: err.message });
  }
});

module.exports = router;
