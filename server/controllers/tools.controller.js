var exec = require('child_process').exec;
var config = require('../../config/env');
var PythonShell = require('python-shell');
var path = require('path');

module.exports = {
    generateSolutions: function(req, res, next) {
        var raw = '', returnArray = [];
        var _scriptPath = config.rootname;
        var pyshell = PythonShell.run('adapter.py', { mode:'text',
            scriptPath: _scriptPath, args:  [config.rootname] });

       exec('./a.out', {cwd:config.rootname}, function(err, data) {
            if(err) next(err);
            pyshell.stdout.on('data', function(data){
                raw = data.toString().trim();
                console.log(raw);
            });

            pyshell.end(function(err){
                if(err) next(err);
                var solnArr = raw.split('\n');
                for(var i = 0; i < solnArr.length; i++){
                    var raws = solnArr[i].split(',');
                    var solnRows = [];
                    for(var j = 0; j < raws.length; j++) {
                        var solnCols = [];
                        for(var k = 0; k < raws.length; k++){

                            solnCols.push(parseInt(raws[j][k]));
                        }
                        solnRows.push(solnCols);
                    }
                    returnArray.push(solnRows);
                }
                res.json({
                    solutions: returnArray
                });
            });
        });

    },
}
