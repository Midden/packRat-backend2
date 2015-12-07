var db = require('./lib/db');

var util = require('util');

var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var session = require('express-session');
var uuid = require('uuid');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var errorhandler = require('errorhandler');
var filetype = require('file-type');

var MongoStore = require('connect-mongo')(session);
process.env.SESSION_SECRET || require('dotenv').load();
// require passport
// require passport config file
var passport = require('./lib/passport');

var routes = require('./routes/index');
var users = require('./routes/users');
var images = require('./routes/images');
// var directories = require('./routes/')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//For file upload
var uploadBaseUrl = function (req) {
  return util.format('%s://%s:%s/images',
    req.protocol,
    req.hostname,
    app.get ('port'));
};

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cors({
  origin: /github\.io/,
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//app.use(express.static(path.join(__dirname, 'public'), { index: false }));
app.use(session({
  secret : process.env.SESSION_SECRET,
  resave : false,
  saveUninitialized : false,
  store : new MongoStore({
    url : process.env.MONGOLAB_URI
  }),
  cookie : {
    maxAge : 900000 // 15 minutes
  },
  genid : function() {
    return uuid.v4({
      rng : uuid.nodeRNG
    });
  }
}));

// mount return value of `passport.initialize` invocation on `app`
app.use(passport.initialize());

// mount return value of `passport.session` invocation on `app`
app.use(passport.session());


//app.use('/', require('./routes/root'));
//app.use('/images', require('./routes/images'));
app.use('/', routes);
app.use('/users', users);
app.use('/images', images);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (true || app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.status(status).json(obj);
    //res.json('error', {
     // message: err.message,
    //  error: err
    });
 // });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorhandler());
}


module.exports = app;
