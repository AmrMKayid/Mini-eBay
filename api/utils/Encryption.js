var bcrypt = require('bcryptjs');

module.exports.hashPassword = function(password, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    callback(err, null);
    bcrypt.hash(password, salt, function(err, hash) {
      callback(err, hash);
    });
  });
};

module.exports.comparePasswordToHash = function(
  candidatePassword,
  hash,
  callback
) {
  bcrypt.compare(candidatePassword, hash, function(err, matches) {
    callback(err, matches);
  });
};
