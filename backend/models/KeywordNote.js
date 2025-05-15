const mongoose = require('mongoose');

const KeywordNoteSchema = new mongoose.Schema({
  text: { type: String, required: true },
  keywords: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('KeywordNote', KeywordNoteSchema);
