var user = require("../models/user");
var db = require("../models");
var axios = require("axios");
require("dotenv").config();
  

module.exports = function(app) {
  app.get("/api/search", function(req, res) {

    var key = process.env.apikey;
    var query = req._parsedOriginalUrl.query;

    var url = "https://api.themoviedb.org/3/search/movie?api_key=" + key + "&language=en-US&query=" + query + "&page=1&include_adult=false";

    axios.get(url)
      .then(function(response) {
        console.log("AXIOS results of TMDB query '" + query + "': ", response.data.results);
      })
      .catch(function(response) {
        console.log("AXIOS error: ", error);
      });
  });

  //routes for deleting user
  app.delete("/:userid", function(req, res){
    user.delete(req.params.userid, function(result){
      if (result.changedRow == 0) {
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    })
  });

  //route for creating user
  app.post("/", function(req, res){
    // {hashedUsername: affw, hashedPassword: 123112e}
    user.create(req.body.userName, pw, function(result){
      res.json("User created!");
    })
  });

};
