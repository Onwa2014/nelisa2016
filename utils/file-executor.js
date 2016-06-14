var ConsoleReader = require("./console-reader"),
    consoleReader = new ConsoleReader(process.stdout),
    fs = require('fs');

exports.execute = function(fileName, cb){

   consoleReader.start();
    fs.readFile("./" + fileName, "utf-8", function (err, val) {

        if(err){
            consoleReader.stop();
            cb(err, null);
        }
        else{

            var f = new Function("", val);
            f();
            consoleReader.stop();
            cb(null, consoleReader.records);

        }
    });
};