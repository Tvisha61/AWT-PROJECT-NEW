// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();
// app.use(express.json());
// app.use(cors());

// // ✅ MongoDB Connection
// mongoose.connect("mongodb://127.0.0.1:27017/ainotes")
//   .then(() => console.log("✅ MongoDB Connected Successfully"))
//   .catch(err => console.log("❌ MongoDB Connection Error:", err));

// const authRoutes = require("./routes/auth");
// app.use("/api/auth", authRoutes);

// const notesRoutes = require("./routes/notes");
// app.use("/api/notes", notesRoutes);


// const flashcardRoutes = require("./routes/flashcards");
// app.use("/api/flashcards", flashcardRoutes);

// const voiceToTextRoutes = require("./routes/voiceToText");
// app.use("/api/voiceToText", voiceToTextRoutes);

// const reminderRoutes = require("./routes/reminders");
// app.use("/api/reminders", reminderRoutes);



// app.listen(5000, () => console.log("🚀 Server running on port 5000"));
























// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();
// app.use(express.json());
// app.use(cors());

// // ✅ MongoDB Connection
// mongoose.connect("mongodb://127.0.0.1:27017/ainotes", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log("✅ MongoDB Connected Successfully"))
//   .catch(err => console.log("❌ MongoDB Connection Error:", err));

// // ✅ Import Routes
// const authRoutes = require("./routes/auth");
// app.use("/api/auth", authRoutes);

// const notesRoutes = require("./routes/notes");
// app.use("/api/notes", notesRoutes);

// const flashcardRoutes = require("./routes/flashcards");
// app.use("/api/flashcards", flashcardRoutes);

// const voiceToTextRoutes = require("./routes/voiceToText");
// app.use("/api/voiceToText", voiceToTextRoutes);

// const reminderRoutes = require("./routes/reminders");
// app.use("/api/reminders", reminderRoutes);

// // ✅ Import & Start Scheduler
// const scheduleReminders = require("./scheduler");
// scheduleReminders();

// // ✅ Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ainotes", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit if MongoDB connection fails
  });

// ✅ Serve Static Files (Uploads)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Import Routes
const authRoutes = require("./routes/auth");
const notesRoutes = require("./routes/notes");
const flashcardRoutes = require("./routes/flashcards");
const voiceToTextRoutes = require("./routes/voiceToText");
const reminderRoutes = require("./routes/reminders");
const dictionaryRoutes = require("./routes/dictionaryRoutes.js");
const Text = require('./models/Text');
const summarizeRoute = require('./routes/summarizeRoute');
const keywordRoutes = require('./routes/keywordRoutes');

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/flashcards", flashcardRoutes);
app.use("/api/voiceToText", voiceToTextRoutes);
app.use("/api/reminders", reminderRoutes);
app.use("/api/dictionary", dictionaryRoutes);
app.use('/api/summarize', summarizeRoute);
app.use('/api/notes', keywordRoutes);


app.post('/api/texts', async (req, res) => {
  try {
    const newText = new Text({ text: req.body.text });
    await newText.save();
    res.status(201).json({ message: 'Text saved' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save text' });
  }
});
// ✅ Import & Start Reminder Scheduler
const { scheduleReminders } = require("./scheduler");
scheduleReminders();

// ✅ Root Route
app.get("/", (req, res) => {
  res.send("📌 AI Notes API is Running...");
});

// ✅ Global Error Handler (Ensures API Stability)
app.use((err, req, res, next) => {
  console.error("⚠️ Server Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
