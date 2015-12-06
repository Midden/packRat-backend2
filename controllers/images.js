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

// var show = function index(req, res, next) {
//     Image.findById({ "_id": req.body.id }, {__v: 0}).exec().then(function(images) {
//     res.json(images);
//   }).catch(function(error) {
//     next(error);
//   });
// };

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

var update = function update(req, res, next) {
  console.log(req.body.imageid, req.body.newfilename);
  Image.findByIdAndUpdate(req.body.imageid, {$set: {name: req.body.newfilename}}, {new: true}).exec().then(function(image) {
    console.log(image);
    image.save();
  });
  // Image.update({"_id": req.body.imageid}, {$set: {name: req.body.newfilename}}, function(images) {
  //   console.log(images);
    // images.save();
};


  // Image.update({"_id": req.body.imageid}, {$set: {name: req.body.newname}}, {new: true}, {multi: false}, ).exec().then(function(image) {
  //   console.log(image);
  // });
  // };

// var update = function(id, field, value) {
//   var modify = {};
//   modify[field] = value;
//   Person.findByIdAndUpdate(id, { $set: modify }, { new: true }).exec().then(function(person) {
//     console.log(person.toJSON());
//   }).catch(console.error
//   ).then(done);
// };

var destroyOneFromUser = function patch(req, res, next) {
  // userFiles = [id1, id2, id3 ...]
  // userFiles.splice(1, id2) => [id1,id3]
  console.log(req.user.userFiles);

  req.user.userFiles.splice(req.user.userFiles.indexOf(req.body.onefile), 1);
  console.log(req.user.userFiles);

  req.user.save();

};

// should be delete single image, will get to after PATCH userFiles arary
var destroyOneFromDb = function destroyOneFromDb(req, res, next){
  console.log(req.body.onefile);
  Image.remove({"_id": req.body.onefile}).exec().then(function(images) {
    console.log(images);
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
};

module.exports = {
  index,
  create,
  update,
  destroyOneFromUser,
  destroyOneFromDb,
  destroy
};

