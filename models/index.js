//jshint node:true


'use strict';

var mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGOLAB_URI);

mongoose.model('User', require('../models/user'));

// mongoose.connect("mongodb://localhost/passport-lesson");

module.exports = mongoose;
