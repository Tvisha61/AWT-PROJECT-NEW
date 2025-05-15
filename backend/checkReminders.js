const mongoose = require("mongoose");
const dotenv = require("dotenv");
const SmartReminder = require("./models/ReminderModel");
const sendEmail = require("./sendEmail");

dotenv.config();

const checkReminders = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const now = new Date();
  const nextMinute = new Date(now.getTime() + 60000);

  const reminders = await SmartReminder.find({
    dateTime: { $gte: now, $lt: nextMinute },
    isSent: false,
  });

  for (const reminder of reminders) {
    try {
      await sendEmail(reminder.email, `Reminder: ${reminder.title}`, reminder.description);
      reminder.isSent = true;
      await reminder.save();
      console.log("✅ Email sent for:", reminder.title);
    } catch (err) {
      console.error("❌ Failed to send email:", err);
    }
  }
};

checkReminders();