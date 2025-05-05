import React from 'react';

function Footer() {
  const footerStyle = {
    backgroundColor: 'white', // dark blue shade matching your hero section
    color: 'black',
    textAlign: 'center',
    padding: '1rem 0',
    fontSize: '0.9rem',
    width: '100%',
    marginTop: 'auto'
  };

  return (
    <footer style={footerStyle}>
      <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
