'use strict'

// jshint node: true
'use strict';



var Directory = require('../models/directory.js');

var done = function() {
  db.close();
};

var create = function(title, user_id) {
  Directory.create({
    'title': title,
    'user': user_id

  }).then(function(directory) {
    console.log(directory);
  }).catch(function(error){
    console.error(error);
  }).then(done);
};

var index = function() {
  Directory.find().exec().then(function(directories) {
    directories.forEach(function(directory) {
      console.log(directory.toJSON());
    });
  }).catch(console.error).then(done);
};
var destroy = function(id) {
  Directory.findById(id).exec().then(function(directory) {
    return directory.remove();
  }).catch(console.error
  ).then(done);
};

var read = function(field, criterion) {
  var search = {};
  if (criterion[0] === '/') {
    var regex = new RegExp(criterion.slice(1, criterion.length-1));
    search[field] = regex;
  } else {
    search[field] = criterion;
  }
  Directory.find(search).exec().then(function(directories) {
    directories.forEach(function(directory) {
      console.log(directory.toObject());
    });
  }).catch(console.error
  ).then(done);
};

var update = function(id, field, value) {
  var modify = {};
  modify[field] = value;
  Directory.findByIdAndUpdate(id, { $set: modify }, { new: true }).exec().then(function(directory) {
    console.log(directory.toJSON());
  }).catch(console.error
  ).then(done);
};

db.once('open', function(){
  var command = process.argv[2];
  switch (command) {
    case 'c':
      var user_id = process.argv[3];
      var title = process.argv[4];
      if (true || user_id) {
        create(title);
      } else {
        console.log('usage c <title> [user_id]');
        done();
      }
    break;
    case 'r':
    //field in mongo is an attribute, like dob or gender
      var field = process.argv[3];
      //criterion is what you are looking for
      var criterion = process.argv[4];
      if (!criterion) {
        console.log('usage: r <field> <criterion');
      } else {
        read(field, criterion);
      }
    break;
    case 'u':
    // this is similar to active record that you have two ways:  update some colunms like a where clause in active record or transform one by grabbing it, changing it and saving it in active record)
       id = process.argv[3];
      field = process.argv[4];
      var value = process.argv[5];
      update(id, field, value);
    break;
    case 'd':
      var id = process.argv[3];
      destroy(id);
    break;
    default:
      index();
      console.log("default");
    break;
  }

});











/*db:directories.update
{name:""}
{name: "new Name"} //this will overwrite everything but the collection id and new name
db.directories.update(
  {"name" : "Old Name"},
  {"$set": { "name": "New Name "}},
  //more than one change
  {"multi": true});

show:
db.directories.find(
{
  "user_id" : "current_user",
  "files.some_tag" : "work"
});

db.directories.find({"user_id": {"$ne : current_user" : false}});*/
