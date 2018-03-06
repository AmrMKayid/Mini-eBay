//User Model
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const encryption = require('../utils/Encryption');

const UserSchema = mongoose.Schema({
  username: { type:String, required: true, index: true, unique:true },
  password: { type: String, required: true },
  userType: { type: Number, default: 0 },
  cartItems: {type: Array}
});

//Pre Save Hook. Used to hash the password
UserSchema.pre('save', function(next) {

  if(!this.isModified('password'))
    return next();

  // Generate Salt Value
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    //Use this salt value to hash password
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      this.password = hash;
      next();
    });

  });

});

// Custom method to check the password correct when login
UserSchema.methods.isPasswordMatch = function(plainPassword, hashed, callback) {
  bcrypt.compare(plainPassword, hashed, (err, isMatch) => {
    if (err) {
      next(err);
    }
    callback(null, isMatch);
  });
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
