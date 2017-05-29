var mongoose = require('mongoose');

var path = require('path');
var fs = require('fs');
var format = require('util').format;

const exec = require('child_process').exec;

var Busboy = require('busboy');
var Paf = mongoose.model('Paf');
var Chart = mongoose.model('Chart');

//POST PAF file
module.exports.postPaf = function(req, res) {
  var pafData = new Paf();
  var busboy = new Busboy({ headers: req.headers });
  
  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    var saveTo = path.normalize(__dirname + '/../../pafs/' + path.basename(filename));
    console.log('Uploading: ' + saveTo);

    pafData.fileUri = saveTo;
    file.pipe(fs.createWriteStream(saveTo));
  });
  
  busboy.on('finish', function() {
    pafData.save(function (err) {
      if (err) handleError(err, res);

      // Make a system call to run the PAF processing jar
      const jarPath = '"' + path.normalize(__dirname + '/../../jar') + '/PAF_parser.jar"';
      const outputFileName = new Date().getTime() + ".txt";
      const parserArgs = '"' + pafData.fileUri + '" "' + path.normalize(__dirname + '/../../charts/' + outputFileName) + '"';
      const jarCmd = '/usr/bin/java -jar ' + jarPath + ' ' + parserArgs;
      
      console.log("JAR command: " + jarCmd);
      exec(jarCmd, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }

        console.log(`exec stdout:\n${stdout}`);
        console.log(`exec stderr:\n${stderr}`);
        
        var chartData = new Chart();
        chartData.fileUri = path.normalize(__dirname + '/../../charts/' + outputFileName);
        chartData.save(function (err) {
          console.log("Saving chart data");
          if (err) handleError(err, res);
        });
      });

      res.status(201).send({message : "Successfully uploaded " + outputFileName + "!"});
    });
  });

  return req.pipe(busboy);
};

function handleError(err, res){
	console.log(err);
	res.status(500).send({message : "Server error!"});
}