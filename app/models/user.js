//Right after connected to MongoDb database
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
      name: String,
      username: {type: String, required: true, index:{unique: true}},
      password: {type: String, required: true, select: false}
});

UserSchema.pre('save', function(next){
      var user = this;

      if(!user.isModified('password')) return next();
      
      //hashing password process
      bcrypt.hash('user.password', null, null, function(err ,hash){
          if(err) console.log(err) return next();

          user.password = hash;
          next();
      });

});

// Export UserSchema object to use with other files
module.exports = mongoose.model('User', UserSchema);
