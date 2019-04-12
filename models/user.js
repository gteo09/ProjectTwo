var orm = require("../config/orm");

var user = {
    create: function( password, cb){
        orm.addUser(password, function(res){
            cb(res);
        });
    },
    
    validate: function(password, cb){
       orm.validateUser(password, function(result){
           cb(result);
       })
    },
};