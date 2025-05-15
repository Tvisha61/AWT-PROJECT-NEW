const mongoose = require("mongoose");

const voiceNoteSchema = new mongoose.Schema({
  transcript: { type: String, required: true },
  summary: { type: String },
  keywords: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("VoiceNote", voiceNoteSchema);
