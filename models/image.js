//jshint node:true

'use strict';

var mongoose = require('mongoose');
var OwnerId = mongoose.Schema.Types.ObjectId;
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
    type: OwnerId,
    ref: "User"
  },
  name: {
    type: String
  }
});


var Image = mongoose.model('Image', imageSchema);

module.exports = Image;
