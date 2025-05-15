// const express = require("express");
// const router = express.Router();
// const Note = require("../models/Note");

// // ✅ Create & Summarize Note
// router.post("/summarize", async (req, res) => {
//     try {
//         const { title, subject, text } = req.body;
//         if (!title || !subject || !text) return res.status(400).json({ error: "All fields are required" });

//         // Simple summarization (you can replace with AI)
//         const summary = text.split(" ").slice(0, 20).join(" ") + "..."; // Takes first 20 words

//         // Save note to MongoDB
//         const newNote = new Note({ title, subject, content: text, summary });
//         await newNote.save();

//         res.json({ message: "Note saved successfully", summary });
//     } catch (error) {
//         console.error("❌ Error saving note:", error);
//         res.status(500).json({ error: "Failed to save note" });
//     }
// });

// // ✅ Fetch All Notes
// router.get("/all", async (req, res) => {
//     try {
//         const notes = await Note.find().sort({ createdAt: -1 });
//         res.json(notes);
//     } catch (error) {
//         console.error("❌ Error fetching notes:", error);
//         res.status(500).json({ error: "Failed to retrieve notes" });
//     }
// });

// // ✅ Update a Note
// router.put("/update/:id", async (req, res) => {
//     try {
//         const { title, subject, content } = req.body;
//         if (!title || !subject || !content) {
//             return res.status(400).json({ error: "All fields are required" });
//         }

//         // Check if note exists
//         const existingNote = await Note.findById(req.params.id);
//         if (!existingNote) {
//             return res.status(404).json({ error: "Note not found" });
//         }

//         // Update note
//         const updatedNote = await Note.findByIdAndUpdate(req.params.id, {
//             title,
//             subject,
//             content,
//             summary: content.split(" ").slice(0, 20).join(" ") + "..." // Update summary
//         }, { new: true });

//         res.json({ message: "Note updated successfully", note: updatedNote });
//     } catch (error) {
//         console.error("❌ Error updating note:", error);
//         res.status(500).json({ error: "Failed to update note" });
//     }
// });

// // ✅ Delete a Note
// router.delete("/delete/:id", async (req, res) => {
//     try {
//         const deletedNote = await Note.findByIdAndDelete(req.params.id);
//         if (!deletedNote) {
//             return res.status(404).json({ error: "Note not found" });
//         }

//         res.json({ message: "Note deleted successfully" });
//     } catch (error) {
//         console.error("❌ Error deleting note:", error);
//         res.status(500).json({ error: "Failed to delete note" });
//     }
// });





// module.exports = router;




























const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const nlp = require("compromise");

// ✅ Create & Summarize Note (for manual input & voice-to-text)
router.post("/summarize", async (req, res) => {
    try {
        const { title, subject, text } = req.body;
        if (!text) return res.status(400).json({ error: "Text content is required" });

        // Dynamic title & subject if not provided (for voice input)
        const noteTitle = title || "Untitled Note";
        const noteSubject = subject || "General";

        // AI-based Summarization (Replace with NLP model if needed)
        const summary = text.split(" ").slice(0, 50).join(" ") + "..."; // First 50 words

        // Save note to MongoDB
        const newNote = new Note({ title: noteTitle, subject: noteSubject, content: text, summary });
        await newNote.save();

        res.json({ message: "✅ Note saved successfully!", summary, note: newNote });
    } catch (error) {
        console.error("❌ Error saving note:", error);
        res.status(500).json({ error: "Failed to save note" });
    }
});

// ✅ Fetch All Notes
router.get("/all", async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.json(notes);
    } catch (error) {
        console.error("❌ Error fetching notes:", error);
        res.status(500).json({ error: "Failed to retrieve notes" });
    }
});

// ✅ Update a Note
router.put("/update/:id", async (req, res) => {
    try {
        const { title, subject, content } = req.body;
        if (!content) return res.status(400).json({ error: "Content is required" });

        const existingNote = await Note.findById(req.params.id);
        if (!existingNote) return res.status(404).json({ error: "Note not found" });

        // Update note with new summary
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {
            title: title || existingNote.title,
            subject: subject || existingNote.subject,
            content,
            summary: content.split(" ").slice(0, 50).join(" ") + "..."
        }, { new: true });

        res.json({ message: "✅ Note updated successfully!", note: updatedNote });
    } catch (error) {
        console.error("❌ Error updating note:", error);
        res.status(500).json({ error: "Failed to update note" });
    }
});

// ✅ Delete a Note
router.delete("/delete/:id", async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) return res.status(404).json({ error: "Note not found" });

        res.json({ message: "✅ Note deleted successfully!" });
    } catch (error) {
        console.error("❌ Error deleting note:", error);
        res.status(500).json({ error: "Failed to delete note" });
    }
});

module.exports = router;


















// const express = require("express");
// const router = express.Router();
// const Note = require("../models/Note");
// const nlp = require("compromise"); // ✅ NLP for Keyword Extraction

// // ✅ Create & Summarize Note
// router.post("/summarize", async (req, res) => {
//     try {
//         const { title, subject, text } = req.body;
//         if (!title || !subject || !text) return res.status(400).json({ error: "All fields are required" });

//         // Simple summarization (First 20 words)
//         const summary = text.split(" ").slice(0, 20).join(" ") + "...";

//         // Save note to MongoDB
//         const newNote = new Note({ title, subject, content: text, summary });
//         await newNote.save();

//         res.json({ message: "Note saved successfully", summary });
//     } catch (error) {
//         console.error("❌ Error saving note:", error);
//         res.status(500).json({ error: "Failed to save note" });
//     }
// });

// // ✅ Extract Keywords from Note
// router.post("/extract-keywords", async (req, res) => {
//     try {
//         const { text } = req.body;
//         if (!text) return res.status(400).json({ error: "Text is required" });

//         // NLP-based Keyword Extraction
//         const doc = nlp(text);
//         const keywords = doc.nouns().out("array"); // Extract nouns as keywords

//         res.json({ keywords });
//     } catch (error) {
//         console.error("❌ Error extracting keywords:", error);
//         res.status(500).json({ error: "Failed to extract keywords" });
//     }
// });

// // ✅ Fetch All Notes
// router.get("/all", async (req, res) => {
//     try {
//         const notes = await Note.find().sort({ createdAt: -1 });
//         res.json(notes);
//     } catch (error) {
//         console.error("❌ Error fetching notes:", error);
//         res.status(500).json({ error: "Failed to retrieve notes" });
//     }
// });

// // ✅ Update a Note
// router.put("/update/:id", async (req, res) => {
//     try {
//         const { title, subject, content } = req.body;
//         if (!title || !subject || !content) {
//             return res.status(400).json({ error: "All fields are required" });
//         }

//         // Check if note exists
//         const existingNote = await Note.findById(req.params.id);
//         if (!existingNote) {
//             return res.status(404).json({ error: "Note not found" });
//         }

//         // Update note
//         const updatedNote = await Note.findByIdAndUpdate(req.params.id, {
//             title,
//             subject,
//             content,
//             summary: content.split(" ").slice(0, 20).join(" ") + "..." // Update summary
//         }, { new: true });

//         res.json({ message: "Note updated successfully", note: updatedNote });
//     } catch (error) {
//         console.error("❌ Error updating note:", error);
//         res.status(500).json({ error: "Failed to update note" });
//     }
// });

// // ✅ Delete a Note
// router.delete("/delete/:id", async (req, res) => {
//     try {
//         const deletedNote = await Note.findByIdAndDelete(req.params.id);
//         if (!deletedNote) {
//             return res.status(404).json({ error: "Note not found" });
//         }

//         res.json({ message: "Note deleted successfully" });
//     } catch (error) {
//         console.error("❌ Error deleting note:", error);
//         res.status(500).json({ error: "Failed to delete note" });
//     }
// });

// module.exports = router;
