// import React, { useState } from 'react';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';
// import './OpenverseSearch.css';

// function OpenverseSearch() {
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState([]);
//   const [message, setMessage] = useState('');
//   const { token } = useAuth();

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     setResults([]);

//     try {
//       // 🔍 Search images from Openverse
//       const res = await axios.get(`https://api.openverse.org/v1/images`, {
//         params: { q: query, page_size: 12 },
//       });

//       const searchResults = res.data.results || [];
//       setResults(searchResults);

//       // 💾 Save search to backend if logged in
//       if (token) {
//         try {
//           await axios.post(
//             'http://localhost:5001/api/search/save',
//             { query },
//             {
//               headers: { Authorization: `Bearer ${token}` },
//             }
//           );
//         } catch (err) {
//           console.warn('⚠️ Search save failed:', err.message);
//         }
//       }
//     } catch (err) {
//       console.error('Openverse API error:', err);
//       setMessage('❌ Failed to fetch results');
//     }
//   };

//   return (
//     <div className="openverse-container">
//       <h2>Openverse Image Search</h2>
//       <form onSubmit={handleSearch} className="search-form">
//         <input
//           type="text"
//           placeholder="Search images..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           required
//           className="search-input"
//         />
//         <button type="submit" className="search-btn">Search</button>
//       </form>

//       {message && <p className="error-msg">{message}</p>}

//       <div className="results-grid">
//         {results.map((img) => (
//           <div key={img.id} className="result-card">
//             <img src={img.thumbnail} alt={img.title || 'Image'} className="result-img" />
//             <p className="img-title">{img.title || 'Untitled'}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default OpenverseSearch;



import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './OpenverseSearch.css';

function OpenverseSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');
  const { token } = useAuth();

  const handleSearch = async (e) => {
    e.preventDefault();
    setMessage('');
    setResults([]);

    try {
      // 🔍 Search images from Openverse
      const res = await axios.get(`https://api.openverse.org/v1/images`, {
        params: { q: query, page_size: 12 },
      });

      const searchResults = res.data.results || [];
      setResults(searchResults);

      // 💾 Save search to backend if logged in
      if (token) {
        try {
          await axios.post(
            'http://localhost:5001/api/search/save',
            { query },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        } catch (err) {
          console.warn('⚠️ Search save failed:', err.message);
        }
      }
    } catch (err) {
      console.error('Openverse API error:', err);
      setMessage('❌ Failed to fetch results');
    }
  };

  // ✅ Save to favorites
  const handleSaveFavorite = async (img) => {
    if (!token) return setMessage('❌ Please login to save favorites.');

    try {
      await axios.post(
        'http://localhost:5001/api/favorites/save',
        {
          title: img.title || 'Untitled',
          thumbnail: img.thumbnail,
          url: img.url || img.foreign_landing_url || '',
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage('✅ Saved to favorites!');
    } catch (err) {
      console.error('❌ Save favorite error:', err);
      setMessage('❌ Failed to save favorite.');
    }
  };

  return (
    <div key={img.id} className="result-card">
  <img src={img.thumbnail} alt={img.title || 'Image'} className="result-img" />
  <div className="info-and-button">
    <div className="text-info">
      <p className="img-title"><strong>Title:</strong> {img.title || 'Untitled'}</p>
      <p><strong>Creator:</strong> {img.creator || 'Unknown'}</p>
      <p><strong>License:</strong> <a href={img.license_url} target="_blank" rel="noreferrer">{img.license}</a></p>
      <p><a href={img.foreign_landing_url} target="_blank" rel="noreferrer">View Source</a></p>
    </div>
    <button className="favorite-btn" onClick={() => handleSaveFavorite(img)}>
      ❤️ Save
    </button>
  </div>
</div>
  );
}

export default OpenverseSearch;
