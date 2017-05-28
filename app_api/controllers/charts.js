var mongoose = require('mongoose');
var path = require('path');
var Chart = mongoose.model('Chart');

// GET chart
module.exports.getChart = function (req, res) {
  Chart
    .findOneAndUpdate({ 'downloaded' : false }, {$set:{ 'downloaded': true }}, {new: true}, function (err, chart) {
      if(err) return handleError(err, res);

      console.log(chart);
      var file = chart.fileUri;
      res.download(file);
    });
};

// DELETE
module.exports.deleteChart = function(req, res) {
  var deleteUri = path.normalize(__dirname + '/../../charts/' + req.params.name);

  Chart.findOneAndRemove({fileUri : deleteUri}, function (err) {
    if(err) return handleError(err, res);

    res.status(200).send({ message : "Chart " + req.params.name + " deleted!"});
  });
}

function handleError(err, res){
  console.log(err);
  res.status(500).send({message : "Server error!"});
}