var watchlist = require("../models/watchlist");
var axios = require("axios");
require("dotenv").config();
  

module.exports = function(app) {
  /* app.get("/api/search", function(req, res) {

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
 */

  /* //route for creating user
  app.post("/api", function(req, res){
    // {hashedUsername: affw, hashedPassword: 123112e}
    user.create(req.body.userName, req.body.pw, function(result){
      res.json("User created!");
    });
  }); */

  //add movies to the watchlist
  app.post("/api/:listName", function(req, res){
    watchlist.add(req.params.listName, req.body.movies, function(result){
      res.json({id: result.insertId});
    });
  });

  //create watchlist with the name and userId provided
  app.post("/api/:listName", function(req, res){
    watchlist.create(req.params.listName, req.params.userId, function(result){
      res.json(result);
    });
  });

  //remove one movie from the list it belongs to
  app.put("/api/:listName", function(req, res){
    watchlist.deleteMovie(req.params.listName, req.body.movieId, function(result){
      res.json(result);
    });
  });

  //delete one list from database
  app.delete("/api/:listName", function(req, res){
    watchlist.delete(req.params.listName, /* req.params.userId,  */function(result){
      res.json(result);
    })
  });

  //delete one movie from a watchlist
  app.delete("/api/:listName/:movieId", function(req, res){
    watchlist.deleteMovie(req.params.movieId, req.params.listName, /* req.params.userId,  */function(result){
      res.json(result);
    })
  })
};
