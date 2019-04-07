var orm = require("../config/orm");

var user = {
    create: function(userName, password, cb){
        orm.addUser(userName, password, function(res){
            cb(res);
        });
    },
    
    validate: function(userName, password, cb){
       orm.validateUser(userName, password, function(result){
           cb(result);
       })
    },

    delete: function(userName, cb){
        orm.deleteUser(userName, function(result){
            cb(result);
        })
    }
}