const express = require('express');
const router = express.Router();
const { createReminder, getAllReminders } = require('../controllers/reminderController');

router.post('/', createReminder);
router.get('/', getAllReminders);

module.exports = router;
