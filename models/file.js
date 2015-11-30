//jshint node:true

'use strict';

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/file-upload');


db.user.insert( { _id: "Directories", path: null } );
db.user.insert( { _id: "Files", path: ",Directories," } );

