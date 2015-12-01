//jshint node:true

'use strict';

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/file-upload');

var fileSchema = new mongoose.Schema({
  name: String,
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  keywords: [{ body: String }]
});

var File = mongoose.model('File', fileSchema);

module.exports = File;

