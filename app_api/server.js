var express = require('express');
var router = express.Router();

var ctrlCharts = require('./controllers/charts');
var ctrlPaf = require('./controllers/pafs');
var ctrlResults = require('./controllers/results');

// Charts
router.get('/charts', ctrlCharts.getChart);
router.delete('/charts', ctrlCharts.deleteChart);

// PAF
router.post('/pafs', ctrlPaf.postPaf);

// Results
router.post('/results', ctrlResults.postResult);

// 404
router.get('*', function(req, res) {
	res.status(404).send("Oops, it seems you've lost your way!");
});
router.post('*', function(req, res) {
	res.status(404).send("Oops, it seems you've lost your way!");
});
router.put('*', function(req, res) {
	res.status(404).send("Oops, it seems you've lost your way!");
});
router.delete('*', function(req, res) {
	res.status(404).send("Oops, it seems you've lost your way!");
});

function printRequest(req, res, next) {
	console.log(req);
	next();
};

module.exports = router;