//jshint node:true


'use strict';

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/file-upload');

var fileSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  mime: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  }
});

var File = mongoose.model('File', fileSchema);

module.exports = File;
