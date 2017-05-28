var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var pafSchema = new mongoose.Schema({
	fileUri: {
		type: String,
		required: true,
		unique: true
	}
});

mongoose.model('Paf', pafSchema);