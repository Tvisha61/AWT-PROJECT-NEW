// utils/reminderUtils.js
function isReminderTimeValid(reminderTime) {
    return new Date(reminderTime) > new Date(); // Ensures reminder time is in the future
  }
  
  module.exports = { isReminderTimeValid };
  