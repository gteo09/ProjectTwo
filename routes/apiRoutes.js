var user = require("../models/user");

module.exports = function(app) {
  app.post("/", function(req, res){
    // {hashedUsername: affw, hashedPassword: 123112e}
    user.create(req.body.hashedUsername, hashedhPassword, function(result){
      res.json("User created!", {id, insertId});
    });
  });

  app.delete("/:userid", function(req, res){
    user.delete(req.params.userid, function(result){
      if (result.changedRow == 0) {
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    })
  })



















};
