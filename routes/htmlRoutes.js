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
  app.get("/", function(req, res){
    watchlist.getAll(function(result){
      res.render("index", {list_name: result.list_name});
    });
  });

  //get all movies from a list
  app.get("/:userId/:listName", function(req, res){
    watchlist.getMovies(req.params.userId, req.params.listName, function(result){
      res.render("index", {movies: result[0].movies})
    })
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
