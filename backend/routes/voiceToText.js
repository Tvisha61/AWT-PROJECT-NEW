// const express = require("express");
// const router = express.Router();
// const VoiceNote = require("../models/VoiceNote");

// // POST route to save voice transcript
// router.post("/save", async (req, res) => {
//   try {
//     const { transcript } = req.body;
//     const newNote = new VoiceNote({ transcript });
//     await newNote.save();
//     res.status(200).json({ message: "Saved successfully", note: newNote });
//   } catch (err) {
//     res.status(500).json({ message: "Error saving voice note", error: err });
//   }
// });

// // GET all voice notes
// router.get("/", async (req, res) => {
//   try {
//     const notes = await VoiceNote.find().sort({ createdAt: -1 });
//     res.status(200).json(notes);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching voice notes", error: err });
//   }
// });

// module.exports = router;



// const express = require("express");
// const router = express.Router();
// const VoiceNote = require("../models/VoiceNote");
// const { summarizeText, extractKeywords } = require("../utils/aiUtils");

// // POST route to save voice transcript and auto-generate summary + keywords
// router.post("/save", async (req, res) => {
//   try {
//     const { transcript } = req.body;

//     const summary = summarizeText(transcript);
//     const keywords = extractKeywords(transcript);

//     const newNote = new VoiceNote({ transcript, summary, keywords });
//     await newNote.save();

//     res.status(200).json({ message: "Saved successfully", note: newNote });
//   } catch (err) {
//     res.status(500).json({ message: "Error saving voice note", error: err });
//   }
// });

// // GET all voice notes
// router.get("/", async (req, res) => {
//   try {
//     const notes = await VoiceNote.find().sort({ createdAt: -1 });
//     res.status(200).json(notes);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching voice notes", error: err });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const VoiceNote = require("../models/VoiceNote");
const { summarizeText, extractKeywords } = require("../utils/summarizer");

router.post("/save", async (req, res) => {
  try {
    const { transcript } = req.body;
    const summary = summarizeText(transcript);
    const keywords = extractKeywords(transcript);

    const newNote = new VoiceNote({ transcript, summary, keywords });
    await newNote.save();

    res.status(200).json({ message: "Saved successfully", voiceNote: newNote });
  } catch (err) {
    console.error("❌ Error saving:", err);
    res.status(500).json({ message: "Error saving note", error: err });
  }
});

router.get("/", async (req, res) => {
  try {
    const notes = await VoiceNote.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching notes", error: err });
  }
});

module.exports = router;
