//jshint node:true

'use strict';
/*var AWS =require('aws-sdk');

var bucket = process.env.AWS_S3_BUCKET ||
 require('dotenv').load() && process.env.AWS_S3_BUCKET;
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/file-upload');
var awsS3 = new AWS.S3();

var createASWDirectory = function (name){
 var params = {
  ACL: 'public-read',
  Bucket: 'midden-wd-09',
  Key: name


 };




};

    s3 = new AWS.S3.Client(),
    bucketFolder = 'bucketA/folderInBucketA';

s3.headBucket({Bucket:bucketFolder},function(err,data){
    if(err){
        s3.createBucket({Bucket:bucketFolder},function(err,data){
            console.log("bucket creation: " +err?"FAIL":"SUCCESS");
        });
     } else {
         console.log("Bucket exists and we have access");
     }
}); */
var directorySchema = new mongoose.Schema({
  name: String,
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: {virtuals: true},
  keywords: [{body:String}]
});

directorySchema.methods.createS3folder = function (err, directory, numAffected) {

};



//model person
var Directory = mongoose.model('Directory', directorySchema);

module.exports = Directory;

