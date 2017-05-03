var spawn = require('child_process').spawn,
    py = spawn('python', ['adapter.py']),
    raw = '';
    solutions = [];

py.stdout.on('data', function(data){
    raw = data.toString().trim();
});

py.stdout.on('end', function(){
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
        solutions.push(solnRows);
    }

    for(i = 0; i < solutions.length; i++){
        var toodee = solutions[i];
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
