//For signup API
var User = require('../models/user');
var config = require('../../config');
var secretKey = config.secretKey;

module.exports = function(app,express){
  var api = express.Router();

  api.post('/signup', function(req,res){
      //call user from user.js file and create
      var user = new User({
          name: req.body.name,
          username: req.body.username,
          password: req.body.password
      });

      //save user into database / schema
      user.save(function(err){
          if(err){
            res.send(err);
          }
          //if no error, show status
          res.json({message: 'user has been created'});
      });
  });

  return api;
  //then go to add middlware into server.js file

}
