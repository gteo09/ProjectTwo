/* var Sequelize = require("sequelize");

// Creates mySQL connection using Sequelize, the empty string in the third argument spot is our password.
var sequelize = new Sequelize("atlas_db", "root", "", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

// Exports the connection for other files to use
module.exports = sequelize; */

var mysql = require('mysql');

var connection = mysql.createConnection({
  host:     'localhost',
  port:     3306,
  user:     'root',
  password: process.env.mysqlpw,
  database: 'atlas_db'
})

connection.connect(function(err){
  if (err) {
    console.err("error connecting: " + err.stack);
    return;
  }
  console.log("Connected as id " + connection.threadId);
})

module.exports = connection;