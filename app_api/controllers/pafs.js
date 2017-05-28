var mongoose = require('mongoose');

var path = require('path');
var fs = require('fs');
var format = require('util').format;

const exec = require('child_process').exec;

var Busboy = require('busboy');
var Paf = mongoose.model('Paf');

//POST PAF file
module.exports.postPaf = function(req, res) {
  var pafData = new Paf();
  var busboy = new Busboy({ headers: req.headers });
  
  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    var saveTo = path.normalize(__dirname + '/../../pafs/' + path.basename(fieldname));
    pafData.fileUri = saveTo;

    file.pipe(fs.createWriteStream(saveTo));
  });
  
  busboy.on('finish', function() {
    pafData.save(function (err) {
      if (err) handleError(err, res);

      // Make a system call to run the PAF processing jar
      exec('ls', (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }

        console.log(`exec stdout: ${stdout}`);
        console.log(`exec stderr: ${stderr}`);
      });

      res.writeHead(200, { 'Connection': 'close' });
      res.status(201).send({message : "Upload successful!"});
    });
  });

  return req.pipe(busBoy);
};

function handleError(err, res){
	console.log(err);
	res.status(500).send({message : "Server error!"});
}