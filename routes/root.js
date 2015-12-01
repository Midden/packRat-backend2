//jshint node:true

'use strict';

var express = require('express');
var router = express.Router();
var controller = require('../controllers/root');

router.get('/', controller.index);

module.exports = router;
