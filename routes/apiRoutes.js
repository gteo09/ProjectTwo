var db = require("../models");
var axios = require("axios");
require("dotenv");

module.exports = function(app) {
  // Get all examples
  app.get("/api/search", function(req, res) {

    var key = process.env.apikey;
    var query = req._parsedOriginalUrl.query;

    var url = "https://api.themoviedb.org/3/search/movie?api_key=" + key + "&language=en-US&query=" + query + "&page=1&include_adult=false";

    axios.get(url)
      .then(response => {
        console.log("AXIOS - results of TMDB query: ", response.data.results);
      })
      .catch(error => {
        console.log("AXIOS error: ", error);
      });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
