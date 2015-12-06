//don't forget .exec() returns a promise
// { __v: 0} is a mongoose thing and if you don't put this in, it returns the json with this.
//handling of route happens in here.
'use strict';

var Image = require('../models/image');
var awsUpload = require('../lib/aws-upload');
var User = require('../controllers/auth.js');

var index = function index(req, res, next) {
    Image.find({}, {__v: 0}).exec().then(function(images) {
    res.json(images);
  }).catch(function(error) {
    next(error);
  });
};

var show = function index(req, res, next) {
    Image.findById({ "_id": req.body.id }, {__v: 0}).exec().then(function(images) {
    res.json(images);
  }).catch(function(error) {
    next(error);
  });
};

var create = function create(req, res, next) {
  awsUpload(req.file.buffer, {path: '/' + req.user.userName + '/' + req.body.name, ownerId: req.user._id, name: req.body.name}).then(function(data){
    req.user.userFiles.push(data._id);
    req.user.save();
    console.log(req.user);
    res.json(data);
  }).catch(function(error) {
    next(error);
  });
};

var destroyOne = function patch(req, res, next) {
  // userFiles = [id1, id2, id3 ...]
  // userFiles.splice(1, id2) => [id1,id3]
  console.log(req.user.userFiles);

  req.user.userFiles.splice(req.user.userFiles.indexOf(req.body.onefile), 1);
  console.log(req.user.userFiles);

  req.user.save();
};

// should be delete single image, will get to after PATCH userFiles arary
// Image.findByIdAndRemove({_id: req.image._id}).exec().then(function(err) {
//       if (err) {
//         return next(err);
//       } else {
//         res.json("File deleted");
//       }
//   });

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
};

module.exports = {
  index,
  create,
  destroyOne,
  destroy
};

