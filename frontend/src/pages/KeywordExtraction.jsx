import { useState } from "react";
import axios from "axios";

const KeywordExtraction = () => {
  const [text, setText] = useState("");
  const [keywords, setKeywords] = useState([]);

  const extractKeywords = async () => {
    if (!text.trim()) {
      alert("Please enter some text first!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/notes/extract-keywords", { text });
      setKeywords(response.data.keywords);
    } catch (error) {
      console.error("❌ Error extracting keywords:", error);
      alert("Failed to extract keywords.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2 style={{ color: "#0099ff" }}>🔑 AI-Powered Keyword Extraction</h2>

      <textarea 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Enter text to extract keywords..." 
        style={{ width: "100%", padding: "10px", marginTop: "10px", height: "100px" }}
      />

      <button 
        onClick={extractKeywords} 
        style={{ width: "100%", padding: "10px", backgroundColor: "#0099ff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", marginTop: "10px" }}
      >
        Extract Keywords
      </button>

      {keywords.length > 0 && (
        <div style={{ marginTop: "20px", padding: "10px", backgroundColor: "#f3f4f6", borderRadius: "5px" }}>
          <h3>🔍 Extracted Keywords:</h3>
          <p>{keywords.join(", ")}</p>
        </div>
      )}
    </div>
  );
};

export default KeywordExtraction;
