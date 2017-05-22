var express = require('express');
var toolsCtrl = require('../controllers/tools.controller');
var router = express.Router();

router.route('/generate')
    .post(toolsCtrl.generateSolutions);

module.exports = router;
