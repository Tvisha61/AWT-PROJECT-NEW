const express = require('express');
const router = express.Router();
const { extractAndSaveKeywords, getAllKeywordNotes } = require('../controllers/keywordController');

router.post('/extract-keywords', extractAndSaveKeywords);
router.get('/all', getAllKeywordNotes);

module.exports = router;
