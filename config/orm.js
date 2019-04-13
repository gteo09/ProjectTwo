var connection = require("./connection");

var orm = {
    addUser: function(userName, password, cb){
        var queryStr = "INSERT INTO atlas_db.users (username, pw) VALUE (?, ?)";
        connection.query(queryStr, [userName, password], function(err, result){
            if (err) throw err;
            cb(result);
        })
    },

    deleteUser: function(userName, cb){
        var queryStr = "DELETE FROM atlas_db.users WHERE username = ?";
        connection.query(queryStr, [userName], function(err, result){
            if (err) throw err;
            cb(result);
        })
    },

    validateUser: function(userName, password, cb){
        var queryStr = "SELECT *  FROM atlas_db.users WHERE username = ?";
        connection.query(queryStr,[userName], function(err, result){
            if (err) throw err;
            if (result.pw === password){
                cb(result);
            } else {
                return false;
            }
        })
    },
    getAllLists: function(cb){
        var queryStr = "SELECT list_name FROM atlas_db.watchlists";
        connection.query(queryStr, function(err, result){
            if (err) throw err;
            cb(result);
        });
    },

    createList: function(listName, userId, cb){
        var queryStr = "INSERT INTO atlas_db.watchlists (list_name, userId) VALUE (?, ?)";
        connection.query(queryStr, [listName, userId], function(err, result){
            if (err) throw err;
            cb(result);
        })
    },
    
    addMovies: function(listName, moviesArr, userId, cb){
        var queryStr = "INSERT INTO atlas_db.watchlists (list_name, movies, userId) VALUE (?, ?, ?)";
        connection.query(queryStr, [listName, moviesArr, userId], function(err, result){
            if (err) throw err;
            cb(result);
        })
    }, 

    deleteList: function(listName, cb){
        var queryStr = "DELETE FROM atlas_db.watchlists WHERE list_name = ?";
        connection.query(queryStr, [listName], function(err, result){
            cb(result);
        })
    }
};

module.exports = orm;

