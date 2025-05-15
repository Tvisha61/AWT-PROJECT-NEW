const schedule = require('node-schedule');

// Example reminder scheduling
const scheduleReminders = () => {
  // Scheduling a reminder for every minute for testing purposes
  schedule.scheduleJob('* * * * *', () => {
    console.log('Reminder Task Executed!');
    // You can replace this with your logic to check reminders and send notifications
  });
};

module.exports = { scheduleReminders };
