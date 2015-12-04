//jshint node:true

'use strict';

var express = require('express');
var router = express.Router();
var controller = require('../controllers/images');

var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

router.get('/', controller.index);

// router.get('/:id', controller.show);

router.post('/', upload.single('file'), controller.create);

router.delete('/:_id', controller.destroyOne);

router.delete('/', controller.destroy);



module.exports = router;
