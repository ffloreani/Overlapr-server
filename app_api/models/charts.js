var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var chartSchema = new mongoose.Schema({
  fileUri: {
    type: String,
    required: true,
    unique: true
  },
  downloaded: {
    type: Boolean,
    required: true,
    default: false
  }
});

mongoose.model('Chart', chartSchema);