
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false); // ✅ Marks loading complete
  }, []);

  const login = (newToken) => {
    if (newToken) {
      localStorage.setItem('token', newToken);
      setToken(newToken);
    } else {
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const isLoggedIn = !!token;

  // Creating the authAxios instance with the token
  const authAxios = axios.create({
    baseURL: 'http://localhost:5001/api', // Update with your backend URL
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (
    <AuthContext.Provider value={{ token, isLoggedIn, login, logout, isLoading, authAxios }}>
      {children}
    </AuthContext.Provider>
  );
};


// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check if a user is already logged in (you can check localStorage or cookies here)
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       setIsAuthenticated(true);
//       // You can decode the token and set user info from here (optional)
//     }
//   }, []);

//   const login = (userData, token) => {
//     setIsAuthenticated(true);
//     setUser(userData);
//     localStorage.setItem('authToken', token); // Store the token for persistence
//     navigate('/dashboard');
//   };

//   const logout = () => {
//     setIsAuthenticated(false);
//     setUser(null);
//     localStorage.removeItem('authToken');
//     navigate('/login');
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
