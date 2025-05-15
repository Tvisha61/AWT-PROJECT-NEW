const Reminder = require('../models/Reminder');

exports.createReminder = async (req, res) => {
  try {
    const { title, date, location } = req.body;
    const reminder = new Reminder({ title, date, location });
    await reminder.save();
    res.status(201).json(reminder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find().sort({ date: 1 });
    res.status(200).json(reminders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
