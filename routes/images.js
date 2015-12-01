'use strict';
'use strict';
var express = require('express');
var router = express.Router();
var controller = require('../controllers/images');

var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

router.get('/', controller.index);

router.post('/', upload.single('file'), controller.create);

module.exports = router;


/*var express = require('express');
var router = express.Router();
var controller = require('../controllers/images');

var multer = require('multer');
var storage = multer.memoryStorage();
var image = multer({ storage });

router.get('/', controller.index);

router.post('/', image.single('image'), controller.create);

module.exports = router;
*/
