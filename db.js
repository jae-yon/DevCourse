// Get the client
const mysql = require('mysql2');

// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'Youtube',
  timezone: '+09:00',
  dateStrings: true
});

module.exports = connection;