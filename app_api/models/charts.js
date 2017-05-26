var mongoose = require('mongoose');

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