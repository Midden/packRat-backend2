//jshint node:true

'use strict';

var mongoose = require('mongoose');
var ownerId = mongoose.Schema.Types.ObjectId;
var imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  ownerId: {
    type: ownerId,
    ref: "User"
  }

});


var Image = mongoose.model('Image', imageSchema);

module.exports = Image;
