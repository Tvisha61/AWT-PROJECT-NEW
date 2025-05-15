// import Dictionary from "../models/Dictionary.js";
// import axios from "axios";

// export const searchWord = async (req, res) => {
//   const { word } = req.body;

//   try {
//     // Check if word already exists in the database
//     let existing = await Dictionary.findOne({ word: word.toLowerCase() });
//     if (existing) return res.json(existing);

//     // If not, fetch from external dictionary API
//     const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
//     const meaning = response.data[0]?.meanings[0]?.definitions[0]?.definition || "Meaning not found.";

//     // Save to DB
//     const newEntry = new Dictionary({
//       word: word.toLowerCase(),
//       meaning,
//     });
//     await newEntry.save();

//     res.json(newEntry);
//   } catch (err) {
//     console.error("Dictionary error:", err.message);
//     res.status(500).json({ message: "Failed to fetch meaning" });
//   }
// };




const Dictionary = require("../models/Dictionary");
const axios = require("axios");

const searchWord = async (req, res) => {
  const { word } = req.body;

  if (!word) {
    return res.status(400).json({ message: "Word is required" });
  }

  try {
    const existing = await Dictionary.findOne({ word: word.toLowerCase() });
    if (existing) {
      return res.json(existing);
    }

    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const meaning = response.data[0]?.meanings[0]?.definitions[0]?.definition || "Meaning not found.";

    const newEntry = new Dictionary({ word: word.toLowerCase(), meaning });
    const saved = await newEntry.save();

    res.status(201).json(saved);
  } catch (error) {
    console.error("❌ Error fetching word meaning:", error.message);
    res.status(500).json({ message: "Error fetching meaning" });
  }
};

module.exports = { searchWord };
