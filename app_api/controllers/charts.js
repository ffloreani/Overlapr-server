var mongoose = require('mongoose');
var path = require('path');
var Chart = mongoose.model('Chart');

// GET chart
module.exports.getChart = function (req, res) {
  Chart
    .findOneAndUpdate({ 'downloaded' : false }, {$set:{ 'downloaded': true }}, {new: true}, function (err, chart) {
      if(err) return handleError(err, res);

      if (chart) {
        console.log(chart);
        var file = chart.fileUri;
        res.download(file);
      } else {
        res.status(404).send("Failed to get chart");
      }
    });
};

function handleError(err, res){
  console.log(err);
  res.status(500).send("Server error!");
}