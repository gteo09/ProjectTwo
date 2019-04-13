var orm = require("../config/orm");

var watchlist = {
    getAll: function(cb){
        orm.getAllLists(function(result){
            cb(result);
        })
    },
    
    getMovies: function(listId, cb){
        orm.getAllMovies(listId, function(result){
            cb(result);
        })
    },

    create: function(listName, cover_img, cb){
        orm.createList(listName, cover_img, function(result){
            cb(result);
        });
    },

    add: function(listId, moviesArr, cb){
        orm.addMovies(listId, moviesArr, function(result){
            cb(result);
        })
    },

    delete: function(listId, cb){
        orm.deleteList(listId, function(result){
            cb(result);
        })
    },

    deleteMovie: function(movieId, listId, cb){
        orm.deleteMovie(movieId, listId, function(result){
            cb(result);
        })
    },

    showAll: function(cb){
        orm.showAllLists(function(result){
            cb(result);
        })
    }
}

module.exports = watchlist;