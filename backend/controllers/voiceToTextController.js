const { summarizeText, extractKeywords } = require("../utils/summarizer");

const saveTranscript = async (req, res) => {
  const { userId, transcript } = req.body;

  try {
    const summary = summarizeText(transcript);
    const keywords = extractKeywords(transcript);

    const newVoiceNote = new VoiceNote({
      userId,
      transcript,
      summary,
      keywords,
    });

    await newVoiceNote.save();

    res.status(200).json({ message: "Transcript saved", voiceNote: newVoiceNote });
  } catch (error) {
    res.status(500).json({ error: "Failed to save transcript" });
  }
};
