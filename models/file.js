//jshint node:true


'use strict';

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/file-upload');

var fileSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  }
});

var File = mongoose.model('File', fileSchema);

File.find({}), function(err, files) {
  if(!err) {
    console.log(files);
  }
};


module.exports = File;
