var mongoose = require('mongoose');
var path = require('path');
var fs = require('fs');
var os = require('os');

var Busboy = require('busboy');
var Result = mongoose.model('Result');

module.exports.postResult = function(req, res) {
	var resData = new Result();
  var busboy = new Busboy({ headers: req.headers });
  
  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    var saveTo = path.normalize(__dirname + '/../../results/' + path.basename(filename));
    console.log('Uploading: ' + saveTo);

    resData.fileUri = saveTo;
    file.pipe(fs.createWriteStream(saveTo));
  });
  
  busboy.on('finish', function() {
    resData.save(function (err) {
      if (err) handleError(err, res);

      res.status(201).send({message : "Upload successful!"});
    });
  });

  return req.pipe(busboy);
};

function handleError(err, res){
  console.log(err);
  res.status(500).send({message : "Server error!"});
}