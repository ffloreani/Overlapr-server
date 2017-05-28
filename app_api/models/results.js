var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var resultSchema = new mongoose.Schema({
  fileUri: {
    type: String,
    required: true,
    unique: true
  }
});

mongoose.model('Result', resultSchema);