var mongoose = require('mongoose');

var pafSchema = new mongoose.Schema({
	fileUri: {
		type: String,
		required: true,
		unique: true
	}
});

mongoose.model('Paf', pafSchema);