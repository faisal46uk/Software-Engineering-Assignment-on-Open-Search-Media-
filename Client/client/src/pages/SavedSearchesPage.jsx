import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SavedSearches.css';

const SavedSearchesPage = () => {
  const [searches, setSearches] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSavedSearches();
  }, []);

  const fetchSavedSearches = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) return setError('No token found. Please log in.');

      const response = await axios.get("http://localhost:5001/api/search/saved-searches", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data?.savedSearches) {
        setSearches(response.data.savedSearches);
      } else {
        setError('Invalid response structure.');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await axios.delete(`http://localhost:5001/api/search/saved-searches/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSearches((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete. Try again.');
    }
  };

  return (
    <div className="saved-searches-container">
      <h2 className="page-title">📌 Saved Searches</h2>

      {error && <p className="error-text">{error}</p>}

      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : (
        <>
          {searches.length > 0 ? (
            <ul className="search-list">
              {searches.map((search) => (
                <li key={search.id} className="search-item">
                  <span className="search-term">{search.searchTerm}</span>
                  <button onClick={() => handleDelete(search.id)} className="delete-btn">✕</button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-results">No saved searches found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default SavedSearchesPage;
