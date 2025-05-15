const mongoose = require("mongoose");

const dictionarySchema = new mongoose.Schema({
  word: { type: String, required: true },
  meaning: { type: String },
  searchedAt: { type: Date, default: Date.now },
});

const Dictionary = mongoose.model("Dictionary", dictionarySchema);

module.exports = Dictionary;
