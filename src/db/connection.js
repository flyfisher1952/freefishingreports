const mysql = require("mysql");
const config = require("./config.js");

// Create a connection to the database
const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
});

// open the MySQL connection
connection.connect((error) => {
    if (error) throw error;
    console.log("Connected...");
});

module.exports = connection;
