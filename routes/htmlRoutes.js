<<<<<<< HEAD
var watchlist = require("../models/watchlist");
=======
var db = require("../models");
var orm = require("../config/orm")
>>>>>>> 880a1af4b1b9eb058762157d359577b0e31c6a9b

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

  // Load page that displays all subcategories 
  app.get("/categories", function(req, res){

    res.render("categories", {customcat: categories.customCategories})
      
  });
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });  
};


