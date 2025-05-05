// import React, { useState } from 'react';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext'; // Import auth context
// import './AuthPage.css'; // Import custom CSS for styling

// function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const { login } = useAuth(); // Use login function from context

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     try {
//       const response = await axios.post('http://localhost:5001/api/auth/login', {
//         email,
//         password,
//       });

//       if (response.data && response.data.token) {
//         login(response.data.token); // Use context to store token
//         setMessage('✅ Login successful!');
//       } else {
//         setMessage('⚠️ Login failed: No token received.');
//       }

//     } catch (error) {
//       login(null);

//       if (error.response && error.response.data) {
//         setMessage(`❌ ${error.response.data.message || 'Login failed'}`);
//       } else if (error.request) {
//         setMessage('❌ No response from server. Check backend or network.');
//       } else {
//         setMessage(`❌ Error: ${error.message}`);
//       }
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <h2>Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Email:</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="form-input"
//             />
//           </div>
//           <div className="form-group">
//             <label>Password:</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="form-input"
//             />
//           </div>
//           <button type="submit" className="auth-btn">Login</button>
//         </form>
//         {message && <p className="error-message">{message}</p>}
//       </div>
//     </div>
//   );
// }

// export default LoginPage;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom'; // ✅ import navigate
// import './AuthPage.css';

// function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const { login } = useAuth();
//   const navigate = useNavigate(); // ✅ create navigate instance

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');

//     try {
//       const response = await axios.post('http://localhost:5001/api/auth/login', {
//         email,
//         password,
//       });

//       if (response.data && response.data.token) {
//         login(response.data.token); // ✅ save token in context
//         setMessage('✅ Login successful!');
//         navigate('/'); // ✅ redirect to Home page
//       } else {
//         setMessage('⚠️ Login failed: No token received.');
//       }
//     } catch (error) {
//       login(null);
//       if (error.response && error.response.data) {
//         setMessage(`❌ ${error.response.data.message || 'Login failed'}`);
//       } else if (error.request) {
//         setMessage('❌ No response from server. Check backend or network.');
//       } else {
//         setMessage(`❌ Error: ${error.message}`);
//       }
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <h2>Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Email:</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="form-input"
//             />
//           </div>
//           <div className="form-group">
//             <label>Password:</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="form-input"
//             />
//           </div>
//           <button type="submit" className="auth-btn">Login</button>
//         </form>
//         {message && <p className="error-message">{message}</p>}
//       </div>
//     </div>
//   );
// }

// export default LoginPage;


import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5001/api/auth/login', {
        email,
        password,
      });

      if (response.data && response.data.token) {
        login(response.data.token);
        setMessage('✅ Login successful!');
        navigate('/');
      } else {
        setMessage('⚠️ Login failed: No token received.');
      }
    } catch (error) {
      login(null);
      if (error.response && error.response.data) {
        setMessage(`❌ ${error.response.data.message || 'Login failed'}`);
      } else if (error.request) {
        setMessage('❌ No response from server. Check backend or network.');
      } else {
        setMessage(`❌ Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-left">
        <div className="logo">Openverse Media Search</div>
        <h1>Welcome to...</h1>
        <p>Openverse Media Search, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper.</p>
      </div>
      <div className="login-right">
        <h2>Login</h2>
        <p className="auth-subtitle">Login to get amazing discounts and offers only for you</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="forgot-link">Forgot your password?</a>
          </div>
          <button type="submit" className="auth-btn">LOGIN</button>
        </form>
        <div className="new-user">
          New user? <a href="/register">Signup</a>
        </div>
        {message && <p className="error-message">{message}</p>}
      </div>
    </div>
  );
}

export default LoginPage;
