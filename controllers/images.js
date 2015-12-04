//don't forget .exec() returns a promise
// { __v: 0} is a mongoose thing and if you don't put this in, it returns the json with this.
//handling of route happens in here.
'use strict';

var Image = require('../models/image');
var awsUpload = require('../lib/aws-upload');
var fileUpload = require('../lib/file-upload');
var User = require('../controllers/auth.js');

var index = function index(req, res, next) {

    Image.find({}, {__v: 0}).exec().then(function(images) {
    res.json(images);
  }).catch(function(error) {
    next(error);
  });
};

var create = function create(req, res, next) {
  awsUpload(req.file.buffer, {path: '/' + req.user.userName, ownerId: req.user._id, name: req.body.name}).then(function(data){
    res.json(data);
  }).catch(function(error) {
    next(error);
  });
};

var destroy = function destroy(req, res, next){
  var id = req.get("id");
  Image.remove({ "id": id }, function (err, image) {
    console.log("deleting single image");
      if (err) {
        return next(err);
    } else {
        res.json(image);
      }
  });


  // Image.findById(req.image._id).exec().then(function(image){
  //   // res.remove(image)
  //   return image.remove();
  // }).catch(function(error) {
  //   next(error);
  // };
};

// var show = function show(req, res, next) {
//   Image.find()
// };

module.exports = {
  index,
  create,
  destroy
};

