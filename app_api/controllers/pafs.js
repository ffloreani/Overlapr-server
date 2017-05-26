var mongoose = require('mongoose');
var path = require('path');
var multiparty = require('multiparty');
var format = require('util').format;

var Paf = mongoose.model('Paf');

//POST PAF file
module.exports.postPaf = function(req, res) {
  var pafData = new Paf();
  var pafFile;

  var form = new multiparty.Form();

  form.on('error', next);

  form.on('close', function() {
    pafData.save(function (err) {
      if (err) handleError(err, res);

      // TODO Make a system call to run PAF processing
      res.status(201).send({message : "Upload successful!"});
    });
  });

  form.on('field', function(name, val){
    if (name !== 'title') return;

    pafData.fileUri = path.normalize(__dirname + '/../../charts/' + val);
  });

  form.on('part', function(part) {
    if (!part.filename) return;
    if (part.name !== 'pafFile') return part.resume();
    
    pafFile = {};
    pafFile.filename = part.filename;
    pafFile.size = 0;
    
    part.on('data', function(buf){
      pafFile.size += buf.length;
    });
  });

  form.parse(req);
};


function handleError(err, res){
	console.log(err);
	res.status(500).send({message : "Server error!"});
}