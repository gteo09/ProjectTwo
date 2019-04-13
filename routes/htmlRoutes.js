var watchlist = require("../models/watchlist");

module.exports = function(app) {
  // Load index page
  /* app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Search additional titles",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  }); */

  //show all watchlists
  app.get("/watchlists", function(req, res){
    watchlist.getAll(function(result){
      //console.log({watchlist: result});
      //console.log((result));
      res.render("allLists", {watchlists: result});
      //res.render({list_min: result});
    });
  });

  //get all movies from a list
  app.get("/watchlists/:listId", function(req, res){
    watchlist.getMovies(req.params.listId, function(result){
      //console.log({movies: JSON.parse(result[0].movies)});
      res.render("watchlist", {watchlist:
                                          {
                                            movies: JSON.parse(result[0].movies),
                                            listId: req.params.listId
                                          }
                              });
    });
  });

  app.get("/", function(req, res){
    watchlist.getAll(function(result){
      res.render("index", {list_min: result})
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });  
};


