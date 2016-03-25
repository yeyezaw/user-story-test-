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
      bcrypt.hash('user.password', null, null, function(err,hash){
          if(err) return next(err);
          //store user password with hashing password DB
          user.password = hash;
          next();
      });

});

//custom method for password
UserSchema.methods.comparePassword = function(password){
      var user = this;
      //load from password DB and compare it
      return bcrypt.compareSync(password, user.password);
}

// Export UserSchema object to use with other files
module.exports = mongoose.model('User', UserSchema);
