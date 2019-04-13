var connection = require("./connection");

var orm = {

    createList: function(listName, cover_img, cb){
        var queryStr = "INSERT INTO atlas_db.watchlists (list_name, cover_img) VALUE (?, ?)";
        connection.query(queryStr, [listName, cover_img], function(err, result){
            if (err) throw err;
            cb(result);
        });
    },
    
    addMovies: function(listId, moviesArr, cb){
        console.log(moviesArr);
        var currentList;
        var retrieveQuery = "Select movies FROM atlas_db.watchlists WHERE id = ?";
        connection.query(retrieveQuery, [listId], function(err, result){
            var jsonArr = JSON.parse(result[0].movies);
            if (jsonArr == null){
                currentList = moviesArr;
            } else {
                currentList = jsonArr.concat(moviesArr);
            }
            currentList = JSON.stringify(currentList);
            var queryStr = "UPDATE atlas_db.watchlists SET movies = ?, cover_img = ? WHERE id = ?";
            var imgLink = "https://image.tmdb.org/t/p/w200" + moviesArr[0].poster_path;
            connection.query(queryStr, [currentList, imgLink, listId], function(err, result){
                if (err) throw err;
                cb(result);
            });
        });
    }, 

    deleteList: function(listId, cb){
        var queryStr = "DELETE FROM atlas_db.watchlists WHERE id = ?";
        connection.query(queryStr, [listId], function(err, result){
            if (err) throw err; 
            cb(result);
        });
    },
    getAllLists: function(cb){
        var queryStr = "SELECT * FROM atlas_db.watchlists";
        connection.query(queryStr, function(err, result){
            if (err) throw err;
            cb(result);
        });
    },

    deleteMovie: function(movieId, listId, cb){
        var currentArr;
        var retrieveQuery = "SELECT movies FROM atlas_db.watchlists WHERE id = ?";
        connection.query(retrieveQuery, [listId], function(err, result){
            if (err) throw err;
            var jsonArr = JSON.parse(result[0].movies);
            //console.log(jsonArr);
            currentArr = deleteFromArr(jsonArr, movieId);
            currentArr = JSON.stringify(currentArr);
            //console.log(currentArr);
            connection.query("UPDATE atlas_db.watchlists SET movies = ? WHERE id = ?", [currentArr, listId], function(err, result){
                if (err) throw err;
                cb(result);
            })
        });
    },

    getAllMovies: function(listId, cb){
        var queryStr = "SELECT movies FROM atlas_db.watchlists WHERE id = ?";
        connection.query(queryStr, [listId], function(err, result){
            if (err) throw err;
            cb(result);
        });
    },

    showAllList: function(cb){
        var queryStr = "SELECT id, list_name FROM atlas_db.watchlists";
        connection.query(queryStr, function(err, result){
            if (err) throw err;
            cb(result);
        })
    }
};

//module.exports = orm;

module.exports = orm;


function deleteFromArr(arr, movieId){
    //console.log(arr);
    //console.log(movieId);
    var resultArr;
    for (var i = 0; i < arr.length; i++){
        if (arr[i].id == movieId){
            //console.log("cut at " + i);
            resultArr = arr.slice(0, i).concat(arr.slice(i + 1, arr.length));
            //console.log(resultArr);
        }
    }
    return resultArr;
}
