require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require("mysql");

if (process.env.JAWSDB_URL){
  var connection
  }

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database "atlas_db"
});

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, function(){
  console.log("Server listening on: http://localhost:" + PORT);
});

module.exports = app;
