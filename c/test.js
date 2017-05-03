var spawn = require('child_process').spawn,
    py = spawn('python', ['adapter.py']),
    raw = [];

py.stdout.on('data', function(data){
    raw.push(data.toString().trim());
});

py.stdout.on('end', function(){
    for(var i = 0; i < raw.length; i++){
        console.log("Number "+i+" "+raw[i]);
    }
});
