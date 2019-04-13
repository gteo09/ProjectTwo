var connection = require("./connection");

var orm = {
    addUser: function(userName, password, cb){
        var queryStr = "INSERT INTO atlas_db.users (username, pw) VALUE (?, ?)";
        connection.query(queryStr, [userName, password], function(err, result){
            if (err) throw err;
            cb(result);
        });
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
        });
    },

    createList: function(listName, cb){
        var queryStr = "INSERT INTO atlas_db.watchlists (list_name) VALUE (?)";
        connection.query(queryStr, [listName], function(err, result){
            if (err) throw err;
            cb(result);
        });
    },
    
    addMovies: function(listName, moviesArr, cb){
        var currentList;
        var retrieveQuery = "Select movies FROM atlas_db.watchlists WHERE list_name = ?";
        connection.query(retrieveQuery, [listName], function(err, result){
            currentList = result[0].movies.concat(moviesArr);
        });
        var queryStr = "UPDATE atlas_db.watchlists SET movies = ? WHERE list_name = ?";
        connection.query(queryStr, [currentList, listName], function(err, result){
            if (err) throw err;
            cb(result);
        });
    }, 

    deleteList: function(listName, cb){
        var queryStr = "DELETE FROM atlas_db.watchlists WHERE list_name = ?";
        connection.query(queryStr, [listName], function(err, result){
            if (err) throw err; 
            cb(result);
        });
    },

    getAllLists: function(cb){
        var queryStr = "SELECT list_name FROM atlas_db.watchlists";
        connection.query(queryStr, function(err, result){
            if (err) throw err;
            cb(result);
        });
    },

    deleteMovie: function(movieId, listName, cb){
        var currentList;
        var retrieveQuery = "SELECT movies FROM atlas_db.watchlists WHERE list_name = ?";
        connection.query(retrieveQuery, [listName], function(err, result){
            if (err) throw err;
            currentList = deleteFromArr(result[0].movies, movieId);
        });
        connection.query("UPDATE atlas_db.watchlists SET movies = ? WHERE list_name = ?", [currentList, listName], function(err, result){
            if (err) throw err;
            cb(result);
        })
    },

    getAllMovies: function(listName, cb){
        var queryStr = "SELECT movies FROM atlas_db.watchlists WHERE list_name = ?";
        connection.query(queryStr, [listName], function(err, result){
            if (err) throw err;
            cb(result);
        });
    }
};

//module.exports = orm;

module.exports = orm;


function deleteFromArr(arr, movieId){
    var resultArr;
    for (var i = 0; i < arr.length; i++){
        if (arr[i].id == movieId){
            resultArr = arr.slice(0, i).concat(arr.slice(i + 1, arr.length));
        }
    }
    return resultArr;
}