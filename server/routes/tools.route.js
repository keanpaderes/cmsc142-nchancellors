var express = require('express');
var toolsCtrl = require('../controllers/tools.controller');
var router = express.Router();

router.route('/generate')
    .get(toolsCtrl.generateSolutions);
    
module.exports = router;
