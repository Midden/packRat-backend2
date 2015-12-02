//jshint node:true

'use strict';

var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },

});


var Image = mongoose.model('Image', imageSchema);

module.exports = Image;
