var express = require('express');
var fs = require('fs');
var url = require('url');
var toolsRoutes = require('./tools.route');
var router = express.Router();

router.get('/', function(req, res){
    res.send({hello:'Hello world!'});
});

router.use('/tools', toolsRoutes);

module.exports = router;
