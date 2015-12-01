//don't forget .exec() returns a promise
// { __v: 0} is a mongoose thing and if you don't put this in, it returns the json with this.
//handling of route happens in here.
'use strict';

var Image = require('../models/image');
var awsUpload = require('../lib/aws-upload');

var index = function index(req, res, next) {
  Image.find({}, { __v: 0}).exec().then(function(images) {
    res.json(images);
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

