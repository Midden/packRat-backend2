'use strict'

// jshint node: true
'use strict';

var File = require('../models/file');
var awsUpload = require('../lib/aws-upload');

var index = function index(req, res, next) {
  File.find({}, { __v: 0}).exec().then(function(files) {
    res.json(files);
  }).catch(function(error) {
    next(error);
  });
};

var create = function create(req, res, next) {

  awsUpload(req.file.buffer, req.body.caption).then(function(data){
     res.json(data);
     }).catch(function(error){
    next(error);

  });
};
module.exports = {
  index
};
