const express = require("express");
const router = express.Router();
const Flashcard = require("../models/Flashcard");

// ✅ Create a new flashcard
router.post("/", async (req, res) => {
  try {
    const { question, answer } = req.body;
    if (!question || !answer) return res.status(400).json({ error: "All fields are required" });

    const newFlashcard = new Flashcard({ question, answer });
    await newFlashcard.save();

    res.json({ message: "Flashcard created!", flashcard: newFlashcard });
  } catch (error) {
    console.error("❌ Error creating flashcard:", error);
    res.status(500).json({ error: "Failed to create flashcard" });
  }
});

// ✅ Get all flashcards
router.get("/", async (req, res) => {
  try {
    const flashcards = await Flashcard.find();
    res.json(flashcards);
  } catch (error) {
    console.error("❌ Error fetching flashcards:", error);
    res.status(500).json({ error: "Failed to retrieve flashcards" });
  }
});

// ✅ Delete a flashcard
router.delete("/:id", async (req, res) => {
  try {
    const deletedFlashcard = await Flashcard.findByIdAndDelete(req.params.id);
    if (!deletedFlashcard) return res.status(404).json({ error: "Flashcard not found" });

    res.json({ message: "Flashcard deleted!" });
  } catch (error) {
    console.error("❌ Error deleting flashcard:", error);
    res.status(500).json({ error: "Failed to delete flashcard" });
  }
});

module.exports = router;
