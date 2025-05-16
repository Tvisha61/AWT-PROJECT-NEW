// import { useState, useRef, useEffect } from "react";
// import axios from "axios";

// const VoiceToText = () => {
//   const [transcript, setTranscript] = useState("");
//   const [recording, setRecording] = useState(false);
//   const [summary, setSummary] = useState("");
//   const [keywords, setKeywords] = useState([]);
//   const [savedNotes, setSavedNotes] = useState([]);
//   const recognitionRef = useRef(null);

//   useEffect(() => {
//     fetchNotes();
//   }, []);

//   const fetchNotes = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/voiceToText");
//       setSavedNotes(res.data);
//     } catch (err) {
//       console.error("Error fetching notes:", err);
//     }
//   };

//   const startRecording = () => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       alert("Speech recognition not supported in this browser.");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.lang = "en-US";
//     recognition.continuous = true;
//     recognition.interimResults = false;

//     recognition.onstart = () => {
//       console.log("🎤 Voice recognition started");
//       setRecording(true);
//       setTranscript("");
//     };

//     recognition.onresult = (event) => {
//       let finalTranscript = "";
//       for (let i = event.resultIndex; i < event.results.length; i++) {
//         finalTranscript += event.results[i][0].transcript + " ";
//       }
//       setTranscript(finalTranscript.trim());
//     };

//     recognition.onerror = (event) => {
//       console.error("❌ Voice recognition error:", event.error);
//       alert("Voice recognition error: " + event.error);
//     };

//     recognition.onend = () => {
//       console.log("🛑 Voice recognition ended");
//       setRecording(false);
//     };

//     recognitionRef.current = recognition;
//     recognition.start();
//   };

//   const stopRecording = () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//     }
//   };

//   const saveTranscript = async () => {
//     if (!transcript.trim()) {
//       alert("Please record or enter some text first.");
//       return;
//     }

//     try {
//       const res = await axios.post("http://localhost:5000/api/voiceToText/save", {
//         transcript,
//       });

//       setSummary(res.data.voiceNote.summary);
//       setKeywords(res.data.voiceNote.keywords);
//       alert("✅ Transcript saved!");
//       fetchNotes();
//       setTranscript("");
//     } catch (err) {
//       console.error("Error saving transcript:", err);
//       alert("❌ Failed to save transcript.");
//     }
//   };

//   return (
//     <div style={styles.wrapper}>
//       <div style={styles.leftPanel}>
//         <h2>🎤 Voice to Text + AI Summary</h2>
//         <button onClick={recording ? stopRecording : startRecording} style={styles.button}>
//           {recording ? "🛑 Stop Recording" : "🎙 Start Recording"}
//         </button>

//         <textarea
//           value={transcript}
//           onChange={(e) => setTranscript(e.target.value)}
//           placeholder="Spoken text will appear here..."
//           style={styles.textarea}
//         />

//         <button onClick={saveTranscript} style={styles.button}>💾 Save & Summarize</button>

//         {summary && (
//           <div style={styles.summaryBox}>
//             <h3>📝 Summary:</h3>
//             <p>{summary}</p>
//             {keywords.length > 0 && (
//               <>
//                 <h4>🔑 Keywords:</h4>
//                 <ul>
//                   {keywords.map((kw, i) => (
//                     <li key={i}>{kw}</li>
//                   ))}
//                 </ul>
//               </>
//             )}
//           </div>
//         )}
//       </div>

//       <div style={styles.rightPanel}>
//         <h2>🗂 Saved Notes</h2>
//         {savedNotes.map((note, index) => (
//           <div key={index} style={styles.noteCard}>
//             <p><strong>Transcript:</strong> {note.transcript}</p>
//             <p><strong>Summary:</strong> {note.summary}</p>
//             <p><strong>Keywords:</strong> {note.keywords?.join(", ")}</p>
//             <small>📅 {new Date(note.createdAt).toLocaleString()}</small>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   wrapper: {
//     display: "flex",
//     gap: "20px",
//     padding: "20px",
//     fontFamily: "Arial, sans-serif",
//   },
//   leftPanel: {
//     flex: 1,
//     padding: "20px",
//     backgroundColor: "#f4faff",
//     borderRadius: "10px",
//     boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//   },
//   rightPanel: {
//     flex: 1,
//     padding: "20px",
//     backgroundColor: "#fff7f7",
//     borderRadius: "10px",
//     boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//     overflowY: "auto",
//     maxHeight: "90vh",
//   },
//   button: {
//     padding: "10px 20px",
//     margin: "10px 0",
//     backgroundColor: "#007bff",
//     color: "#fff",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
//   textarea: {
//     width: "100%",
//     height: "100px",
//     padding: "10px",
//     borderRadius: "5px",
//     border: "1px solid #ccc",
//     marginBottom: "10px",
//   },
//   summaryBox: {
//     backgroundColor: "#e0f7fa",
//     padding: "15px",
//     borderRadius: "5px",
//     marginTop: "15px",
//   },
//   noteCard: {
//     border: "1px solid #ddd",
//     padding: "15px",
//     borderRadius: "8px",
//     marginBottom: "10px",
//     backgroundColor: "#fff",
//   },
// };

// export default VoiceToText;



import { useState, useRef, useEffect } from "react";
import axios from "axios";

const VoiceToText = () => {
  const [transcript, setTranscript] = useState("");
  const [recording, setRecording] = useState(false);
  const [summary, setSummary] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [savedNotes, setSavedNotes] = useState([]);
  const recognitionRef = useRef(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/voiceToText");
      setSavedNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  const startRecording = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser. Please use Google Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setRecording(true);
      setTranscript("");
      console.log("Voice recognition started");
    };

    recognition.onresult = (event) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        finalTranscript += event.results[i][0].transcript + " ";
      }
      setTranscript(finalTranscript.trim());
    };

    recognition.onerror = (event) => {
      console.error("Voice recognition error:", event.error);
      alert("Voice recognition error: " + event.error);
      setRecording(false);
    };

    recognition.onend = () => {
      console.log("Voice recognition ended");
      setRecording(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const saveTranscript = async () => {
    if (!transcript.trim()) {
      alert("Please record or type something before saving.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/voiceToText/save", {
        transcript,
      });

      setSummary(res.data.voiceNote.summary);
      setKeywords(res.data.voiceNote.keywords);
      alert("Transcript saved successfully.");
      setTranscript("");
      fetchNotes();
    } catch (err) {
      console.error("Error saving transcript:", err);
      alert("Failed to save transcript.");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.leftPanel}>
        <h2>🎤 Voice to Text + AI Summary</h2>
        <button
          onClick={recording ? stopRecording : startRecording}
          style={styles.button}
        >
          {recording ? "🛑 Stop Recording" : "🎙 Start Recording"}
        </button>

        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="Spoken text will appear here..."
          style={styles.textarea}
        />

        <button onClick={saveTranscript} style={styles.button}>
          💾 Save & Summarize
        </button>

        {summary && (
          <div style={styles.summaryBox}>
            <h3>📝 Summary:</h3>
            <p>{summary}</p>
            {keywords.length > 0 && (
              <>
                <h4>🔑 Keywords:</h4>
                <ul>
                  {keywords.map((kw, i) => (
                    <li key={i}>{kw}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </div>

      <div style={styles.rightPanel}>
        <h2>🗂 Saved Notes</h2>
        {savedNotes.map((note, index) => (
          <div key={index} style={styles.noteCard}>
            <p><strong>Transcript:</strong> {note.transcript}</p>
            <p><strong>Summary:</strong> {note.summary}</p>
            <p><strong>Keywords:</strong> {note.keywords?.join(", ")}</p>
            <small>📅 {new Date(note.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    gap: "20px",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  leftPanel: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#f4faff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  rightPanel: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#fff7f7",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    overflowY: "auto",
    maxHeight: "90vh",
  },
  button: {
    padding: "10px 20px",
    margin: "10px 0",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  textarea: {
    width: "100%",
    height: "100px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "10px",
  },
  summaryBox: {
    backgroundColor: "#e0f7fa",
    padding: "15px",
    borderRadius: "5px",
    marginTop: "15px",
  },
  noteCard: {
    border: "1px solid #ddd",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "10px",
    backgroundColor: "#fff",
  },
};

export default VoiceToText;
