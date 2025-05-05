// server/src/config/db.js
const mysql = require('mysql2/promise'); // Use promise version

const pool = mysql.createPool({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection (optional but good practice)
pool.getConnection()
  .then(connection => {
    console.log('MySQL Database connected successfully');
    connection.release();
  })
  .catch(error => {
    console.error('Error connecting to MySQL Database:', error);
  });

module.exports = pool;