'use strict'

// jshint node: true
'use strict';

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/mongoose-crud');
var db = mongoose.connection;

var File = require('./model/file.js');

var done = function() {
 db.close();
};

var create = function(name, keywords) {
 File.create({
   name : name,
   keywords : keywords
 }).then(function(file) {
   console.log(file);
 }).catch(function(error){
   console.error(error);
 }).then(done);
};

var index = function() {
 File.find().exec().then(function(files) {
   files.forEach(function(file) {
     console.log(file.toJSON());
   });
 }).catch(console.error).then(done);
};
var destroy = function(id) {
 File.findById(id).exec().then(function(file) {
   return file.remove();
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
 File.find(search).exec().then(function(files) {
   files.forEach(function(file) {
     console.log(file.toObject());
   });
 }).catch(console.error
 ).then(done);
};

var update = function(id, field, value) {
 var modify = {};
 modify[field] = value;
 File.findByIdAndUpdate(id, { $set: modify }, { new: true }).exec().then(function(file) {
   console.log(file.toJSON());
 }).catch(console.error
 ).then(done);
};

db.once('open', function(){
 var command = process.argv[2];
 switch (command) {
   case 'c':
     var name = process.argv[3];
     var keywords = process.argv[4];
     if (true || name) {
       create(name, keywords);
     } else {
       console.log('usage c <given_name> [surname]');
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
