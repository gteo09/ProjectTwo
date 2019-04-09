var orm = require("../config/orm");

var watchlist = {
    getAll: function(userId, cb){
        orm.getAllLists(userId, function(result){
            cb(result);
        })
    },
    
    create: function(listName, userId, cb){
        orm.createList(listName, userId, function(result){
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
    }
}

module.exports = watchlist;