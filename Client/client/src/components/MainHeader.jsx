// import { useAuth } from '../context/AuthContext';

// const MainHeader = () => {
//   const { isAuthenticated, logout } = useAuth();

//   return (
//     <nav>
//       {isAuthenticated ? (
//         <>
//           <button onClick={logout}>Logout</button>
//         </>
//       ) : (
//         <>
//           <a href="/login">Login</a>
//         </>
//       )}
//     </nav>
//   );
// };


// import { useAuth } from '../context/AuthContext';
// import { Link } from 'react-router-dom'; // For navigation between pages

// const MainHeader = () => {
//   const { isAuthenticated, logout } = useAuth();

//   return (
//     <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
//       <div>
//         <Link to="/" className="text-xl font-bold">
//           MyApp
//         </Link>
//       </div>

//       <div>
//         {isAuthenticated ? (
//           <>
//             <Link to="/dashboard" className="mr-4">Dashboard</Link>
//             <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
//           </>
//         ) : (
//           <>
//             <Link to="/login" className="mr-4">Login</Link>
//             <Link to="/register" className="bg-blue-500 text-white px-4 py-2 rounded">Register</Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default MainHeader;

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const MainHeader = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const headerWrapperStyle = {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // transparent with white tint
    backdropFilter: 'blur(10px)', // frosted glass effect
    WebkitBackdropFilter: 'blur(10px)',
    borderRadius: '50px',
    padding: '10px 30px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1000,
    width: '90%',
    maxWidth: '1200px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  };

  const navLinkStyle = {
    marginRight: '20px',
    textDecoration: 'none',
    color: '#fff',
    fontSize: '16px',
    transition: 'color 0.3s',
  };

  const navButtonStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  };

  const logoutButtonStyle = {
    ...navButtonStyle,
    backgroundColor: '#dc3545',
  };

  const mobileMenuStyle = {
    display: isOpen ? 'block' : 'none',
    backgroundColor: 'rgba(0,0,0,0.8)',
    position: 'absolute',
    top: '80px',
    right: '20px',
    padding: '20px',
    borderRadius: '20px',
    zIndex: 999,
  };

  const mobileLink = {
    display: 'block',
    color: '#fff',
    textDecoration: 'none',
    marginBottom: '12px',
    fontSize: '16px',
  };

  const toggleBtnStyle = {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '18px',
    width: '24px',
  };

  const barStyle = {
    height: '2px',
    width: '100%',
    backgroundColor: '#fff',
  };

  return (
    <>
      <header style={headerWrapperStyle}>
        <Link to="/" style={{ fontSize: '22px', fontWeight: 'bold', color: '#fff', textDecoration: 'none' }}>
          MyApp
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'none' }} className="desktop-nav">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" style={navLinkStyle}>Dashboard</Link>
              <button onClick={logout} style={logoutButtonStyle}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={navLinkStyle}>Login</Link>
              <Link to="/register" style={navButtonStyle}>Register</Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button onClick={toggleMenu} style={toggleBtnStyle} className="mobile-toggle">
          <span style={barStyle}></span>
          <span style={barStyle}></span>
          <span style={barStyle}></span>
        </button>
      </header>

      {/* Mobile Menu */}
      <div style={mobileMenuStyle} className="mobile-nav">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" style={mobileLink} onClick={() => setIsOpen(false)}>Dashboard</Link>
            <button onClick={() => { logout(); setIsOpen(false); }} style={logoutButtonStyle}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={mobileLink} onClick={() => setIsOpen(false)}>Login</Link>
            <Link to="/register" style={navButtonStyle} onClick={() => setIsOpen(false)}>Register</Link>
          </>
        )}
      </div>
    </>
  );
};

export default MainHeader;
