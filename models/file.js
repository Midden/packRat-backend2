//jshint node:true

'use strict';

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/file-upload');
var Schema = mongoose.Schema;


var FileSchema = new Schema({
    title: String,
    toObject: { virtuals: true },
    toJSON: {virtuals: true},
    timestamps: true
});

