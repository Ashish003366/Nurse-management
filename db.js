const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Root@1124',
  database: 'nurse_db',
});

module.exports = pool;