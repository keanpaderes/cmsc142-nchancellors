var spawn = require('child_process').spawn,
    dirname = __dirname + '/adapter.py',
    py = spawn('python', [dirname]);
var PythonShell = require('python-shell');

module.exports = {
    generateSolutions: function(req, res, next) {
        var raw = '', returnArray = [];
        var pyshell = PythonShell.run('adapter.py', { mode:'text', scriptPath: __dirname });

        console.log(dirname);

        pyshell.stdout.on('data', function(data){
            raw = data.toString().trim();
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

            for(i = 0; i < returnArray.length; i++){
                var toodee = returnArray[i];
                console.log("Solution " + i);
                var plc = "";
                for(j = 0; j < toodee.length; j++) {
                    plc = "";
                    for(k = 0; k < toodee.length; k++) {
                        plc += toodee[j][k] + " ";
                    }
                    console.log(plc);
                    plc = "";
                }
            }
        });

        // console.log("pls" + dirname);
        for(i = 0; i < returnArray.length; i++){
            var toodee = returnArray[i];
            console.log("Solution " + i);
            var plc = "";
            for(j = 0; j < toodee.length; j++) {
                plc = "";
                for(k = 0; k < toodee.length; k++) {
                    plc += toodee[j][k] + " ";
                }
                console.log(plc);
                plc = "";
            }
        }
        res.json({
            solutions: returnArray
        });
    },
}
