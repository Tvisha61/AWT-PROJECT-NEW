const express = require('express');
const router = express.Router();
const Summary = require('../models/Summary');

// Basic summarization function (can be replaced with AI later)
function summarizeText(text) {
  const sentences = text.split('.').filter(s => s.trim().length > 0);
  return sentences.slice(0, 3).join('. ') + '.';
}

router.post('/', async (req, res) => {
  const { content } = req.body;

  if (!content || content.trim() === '') {
    return res.status(400).json({ error: 'No content provided' });
  }

  const summary = summarizeText(content);

  try {
    const saved = await Summary.create({ content, summary });
    res.status(200).json({ summary: saved.summary });
  } catch (err) {
    console.error('Error summarizing text:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
