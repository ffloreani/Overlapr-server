var express = require('express');
var router = express.Router();

var ctrlCharts = require('./controllers/charts');
var ctrlPaf = require('./controllers/paf');

// Charts
router.get('/charts', ctrlCharts.getChart);
router.post('/charts', ctrlCharts.postChart);
router.delete('/charts', ctrlCharts.deleteChart);

// PAF
router.post('/pafs', ctrlPaf.postPaf);

// 404
router.get('*', function(req, res) {
	res.status(404).send("Oops, it seems you've lost your way!");
});
router.post('*', function(req, res) {
	res.status(404).send("Oops, it seems you've lost your way!");
});

function printRequest(req, res, next) {
	console.log(req);
	next();
};

module.exports = router;