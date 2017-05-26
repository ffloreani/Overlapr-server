var mongoose = require('mongoose');

var pafSchema = new mongoose.Schema({
	fileUri: {
		type: String,
		required: true,
		unique: true
	},
	processed: {
		type: Boolean,
		required: true,
		default: false
	}
});

mongoose.model('Paf', pafSchema);