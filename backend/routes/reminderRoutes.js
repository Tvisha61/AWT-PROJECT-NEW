// routes/reminderRouter.js
const express = require('express');
const router = express.Router();
const reminderController = require('../controllers/reminderController');

router.post('/reminders', reminderController.createReminder);  // Create reminder
router.get('/reminders', reminderController.getReminders);     // Get all reminders
router.delete('/reminders/:id', reminderController.deleteReminder);  // Delete reminder

module.exports = router;
