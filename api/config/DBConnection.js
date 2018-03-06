require('dotenv').config();
var mongoose = require('mongoose'),
    config = require('../config/Config'),
    dburl = config.MONGODB_URI;

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
var gracefulShutdown = function(callback) {
  mongoose.connection.close(function(err) {
    callback(err);
  });
};

// For nodemon restarts
process.once('SIGUSR2', function() {
  gracefulShutdown(function(err) {
    if (err) {
      return console.error(err);
    }
    console.log('nodemon restart');
    process.kill(process.pid, 'SIGUSR2');
  });
});

// For app termination
process.on('SIGINT', function() {
  gracefulShutdown(function(err) {
    if (err) {
      return console.error(err);
    }
    console.log('App termination (SIGINT)');
    process.exit(0);
  });
});

// For Heroku app termination
process.on('SIGTERM', function() {
  gracefulShutdown(function(err) {
    if (err) {
      return console.error(err);
    }
    console.log('App termination (SIGTERM)');
    process.exit(0);
  });
});

// Database Connection
mongoose.connect(dburl, function(err) {
  if (!err) {
    return console.log('Successfully connected to the database');
  }
  console.error(err);
  gracefulShutdown(function(err) {
    if (err) {
      return console.error(err);
    }
    console.log('Could not connect to database');
    process.exit(0);
  });
});

require('../models/Product');
