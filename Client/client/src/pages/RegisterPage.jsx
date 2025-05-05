



// import React, { useState } from 'react';
// import axios from 'axios';
// import './RegisterPage.css';

// function RegisterPage() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');

//     if (password !== confirmPassword) {
//       setMessage('Error: Passwords do not match');
//       return;
//     }

//     try {
//       const response = await axios.post(
//         'http://localhost:5001/api/auth/register',
//         { name, email, password },
//         { headers: { 'Content-Type': 'application/json' } }
//       );

//       setMessage(`Success: ${response.data.message}`);
//       setName('');
//       setEmail('');
//       setPassword('');
//       setConfirmPassword('');
//     } catch (error) {
//       if (error.response) {
//         setMessage(`Error: ${error.response.data.error || 'Unknown error'}`);
//       } else if (error.request) {
//         setMessage('Error: No response from server. Is it running?');
//       } else {
//         setMessage(`Error: ${error.message}`);
//       }
//     }
//   };

//   return (
//     <div className="register-wrapper">
//       <div className="register-box">
//         <h2 className="register-title">Create Account</h2>
//         <form onSubmit={handleSubmit} className="register-form">
//           <div className="form-group">
//             <label htmlFor="name">Name</label>
//             <input
//               type="text"
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               placeholder="Enter your name"
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               placeholder="Enter your email"
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               minLength={6}
//               placeholder="Enter your password"
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="confirmPassword">Confirm Password</label>
//             <input
//               type="password"
//               id="confirmPassword"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//               minLength={6}
//               placeholder="Re-enter your password"
//             />
//           </div>
//           <button type="submit" className="register-btn">Register</button>
//         </form>
//         {message && <p className="register-message">{message}</p>}
//       </div>
//     </div>
//   );
// }

// export default RegisterPage;


import React, { useState } from 'react';
import axios from 'axios';
import './RegisterPage.css';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (password !== confirmPassword) {
      setMessage('Error: Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5001/api/auth/register',
        { name, email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      setMessage(`Success: ${response.data.message}`);
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      if (error.response) {
        setMessage(`Error: ${error.response.data.error || 'Unknown error'}`);
      } else if (error.request) {
        setMessage('Error: No response from server. Is it running?');
      } else {
        setMessage(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <h2 className="register-title">Create Account</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="row">
            <div className="form-group half">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group half">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="Enter your password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              placeholder="Re-enter your password"
            />
          </div>
          <button type="submit" className="register-btn">Register</button>
          {message && <p className="register-message">{message}</p>}
        </form>
      </div>

      <div className="register-right">
        <img
          src="https://img.freepik.com/free-vector/website-setup-concept-landing-page_23-2148303073.jpg?ga=GA1.1.1534122042.1736402083&semt=ais_hybrid&w=740"
          alt="Register Illustration"
        />
      </div>
    </div>
  );
}

export default RegisterPage;
