//jshint node:true

'use strict';

var express = require('express');
var router = express.Router();
var controller = require('../controllers/images');
var image = require('../models/image');

var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

router.get('/', controller.index);

// router.get('/' + image.path, controller.show);

// localhost:5000/images?user=xxx&image=xxx

router.post('/', upload.single('file'), controller.create);

router.patch('/deleteone', controller.destroyOne);

//router.delete('/', controller.destroy);



module.exports = router;
