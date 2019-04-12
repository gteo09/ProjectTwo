var orm = require("../config/orm");

var watchlist = {
    getAll: function(cb){
        orm.getAllLists(function(result){
            cb(result);
        })
    },
    
    getMovies: function(listName, cb){
        orm.getAllMovies(listName, function(result){
            cb(result);
        })
    },

    create: function(listName, cb){
        orm.createList(listName, function(result){
            cb(result);
        });
    },

    add: function(listName, moviesArr, cb){
        orm.addMovies(listName, moviesArr, function(result){
            cb(result);
        })
    },

    delete: function(listName, cb){
        orm.deleteList(listName, function(result){
            cb(result);
        })
    },

    deleteMovie: function(movieId, listName, cb){
        orm.deleteMovie(movieId, listName, function(result){
            cb(result);
        })
    }
}

module.exports = watchlist;