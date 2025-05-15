const KeywordNote = require('../models/KeywordNote');

// Simple keyword extractor: returns top words (for demo)
const extractKeywords = (text) => {
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const frequency = {};
  words.forEach(word => {
    if (word.length > 3) {
      frequency[word] = (frequency[word] || 0) + 1;
    }
  });

  // Return top 5 keywords
  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(entry => entry[0]);
};

exports.extractAndSaveKeywords = async (req, res) => {
  const { text } = req.body;

  if (!text || text.trim() === '') {
    return res.status(400).json({ error: 'Text is required' });
  }

  const keywords = extractKeywords(text);

  try {
    const savedNote = await KeywordNote.create({ text, keywords });
    res.status(200).json({ message: 'Keywords extracted and saved', keywords: savedNote.keywords });
  } catch (err) {
    console.error('Error saving keyword note:', err);
    res.status(500).json({ error: 'Failed to save keyword note' });
  }
};

exports.getAllKeywordNotes = async (req, res) => {
  try {
    const notes = await KeywordNote.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    console.error('Error fetching keyword notes:', err);
    res.status(500).json({ error: 'Failed to fetch keyword notes' });
  }
};
