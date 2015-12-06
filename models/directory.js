
'use strict';
var bucket = process.env.AWS_BUCKET ||
   require('dotenv').load() && process.env.AWS_BUCKET;
var util = require('util');
var AWS = require('aws-sdk');


var accessKeyId =  process.env.AWS_ACCESS_KEY;
var secretAccessKey = process.env.AWS_SECRET_KEY;


AWS.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey
});

//var awsS3MiddenBucket = new AWS.S3({params: { ACL: 'public-read', Bucket: 'midden'}});
var awsS3 = new AWS.S3();

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/file-upload');
var directorySchema = new mongoose.Schema({name: String});

directorySchema.methods.createAWSdirectory = function () {
  console.log("createAWSdirectory: start");
  var dName = this.name+"/";
  var params = {
            Bucket: bucket,
            Key: dName
  };

  return new Promise(function(resolve, reject) {
    console.log("createAWSdirectory: start upload");
    awsS3.putObject(params, function(err, data) {
      data && console.log("createAWSdirectory: putObject result = " + data.inspect);
      err && console.log("createAWSdirectory: putObject error = " + err.inspect);

      if (err) {
        reject(err);
      }
      resolve(data);
    }); // end of awsS3.upload


  }).then(function(data) {
     console.log("createAWSdirectory: resolved data = " + data.inspect);

    // return Directory.create({
    //   name: data.name,
    //   bucket: bucket

    // });
  }).catch(function(error){
   console.error("createAWSdirectory: ERROR!!!! = " + error.inspect);

  });
};

var directory = mongoose.model('directory', directorySchema);

// Sample code that the controller would use to create a directory

// var newDir = new directory({name: 'newDirectory4'});
// console.log("newDir is ", newDir);

// newDir.createAWSdirectory();

module.exports = directory;
