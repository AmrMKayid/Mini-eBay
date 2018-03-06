require('dotenv').config();
require('./api/config/DBConnection');
var express = require('express'),
    logger = require('morgan'),
    path = require('path'),
    cors = require('cors'), // To link Angular port with Node port
    helmet = require('helmet'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    routes = require('./api/routes/index'),
    config = require('./api/config/Config'),
    User = require('./api/models/User.js');

// Initialize app with express
app = express();

app.set('secret', config.SECRET);

app.use(logger(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
  })
);
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use('/api', routes);

// Static Public Folder
app.use(express.static(path.join(__dirname, 'public')));


// 500 internal server error handler
app.use(function(err, req, res, next) {
  if (err.statusCode === 404) return next();
  res.status(500).json({
    // Never leak the stack trace of the err if running in production mode
    err: process.env.NODE_ENV === 'production' ? null : err,
    msg: '500 Internal Server Error',
    data: null
  });
});

// 404 error handler
app.use(function(req, res) {
  res.status(404).json({
    err: null,
    msg: '404 Not Found',
    data: null
  });
});

module.exports = app;
