var app = require('./config/express');
var config = require('./config/env');
var port = config.port || process.env.PORT;

app.listen(port);
console.log("App listening on port " + port);
