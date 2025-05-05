import React from 'react';
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import SavedSearchesPage from './pages/SavedSearchesPage';
import ProfilePage from './pages/ProfilePage'; // ✅ Import ProfilePage
import { useAuth } from './context/AuthContext';
import './App.css';
import Footer from './components/Footer';

function App() {
  const { isLoggedIn, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (isLoading) {
    return <div className="loading-screen">Authenticating...</div>;
  }

  return (
    <div className="app-container">
      <nav className="navbar">
        <h2 className="app-title">Openverse Media Search.</h2>
        <ul className="nav-links">
          {isLoggedIn ? (
            <>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/search">Search</Link></li>
              <li><Link to="/saved-searches">History</Link></li>
              <li><Link to="/profile">Profile</Link></li> {/* ✅ Profile link */}
              <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route path="/" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" replace />} />
        <Route path="/search" element={isLoggedIn ? <SearchPage /> : <Navigate to="/login" replace />} />
        <Route path="/saved-searches" element={isLoggedIn ? <SavedSearchesPage /> : <Navigate to="/login" replace />} />
        <Route path="/profile" element={isLoggedIn ? <ProfilePage /> : <Navigate to="/login" replace />} /> {/* ✅ Profile route */}

        {/* Fallback Route */}
        <Route path="*" element={<div>Page Not Found</div>} />
        
      </Routes>
    </div>
  );
}

export default App;
