'use strict';

var express = require('express');
var router = express.Router();
var controller = require('../controllers/directories');

router.get('/', controller.index);

module.exports = router;
