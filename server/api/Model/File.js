const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
 fileName: String,
 filePath: String,
 fileSize: Number
});

module.exports = mongoose.model('File', FileSchema);