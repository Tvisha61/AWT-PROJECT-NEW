import { useState } from "react";
import Flashcards from "./Flashcards";
import KeywordExtraction from "./KeywordExtraction";
import Notes from "./Notes";
import VoiceToText from "./VoiceToText";
import RemindersPage from "./RemindersPage";
import TextToSpeech from "./TextToSpeech";
import FileSummarizer from "./FileSummarizer";
import Dictionary from "./Dictionary"

const Dashboard = () => {
  const [selectedPage, setSelectedPage] = useState("Notes"); // Default page

  const renderPage = () => {
    switch (selectedPage) {
      case "Flashcards":
        return <Flashcards />;
      case "KeywordExtraction":
        return <KeywordExtraction />;
      case "VoiceTotext":
        return <VoiceToText />;
      default:
        return <Notes />;
      case "RemindersPage":
        return<RemindersPage/>;
      case "TextToSpeech":
        return <TextToSpeech/>;
      case "FileSummarizer":
        return <FileSummarizer/>;
      case "Dictionary":
        return <Dictionary/>;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div style={{ width: "250px", background: "#282c34", color: "white", padding: "20px" }}>
        <h2>AINotes</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li onClick={() => setSelectedPage("Flashcards")} style={linkStyle}>Flashcards</li>
          <li onClick={() => setSelectedPage("KeywordExtraction")} style={linkStyle}>Keyword Extraction</li>
          <li onClick={() => setSelectedPage("Notes")} style={linkStyle}>Notes</li>
          <li onClick={() => setSelectedPage("VoiceTotext")} style={linkStyle}>Voice to Text</li>
          <li onClick={() => setSelectedPage("TextToSpeech")} style={linkStyle}>Text To Speech</li>
          <li onClick={() => setSelectedPage("FileSummarizer")} style={linkStyle}>File Summarizer</li>
          <li onClick={() => setSelectedPage("RemindersPage")} style={linkStyle}>Reminders</li>
          <li onClick={() => setSelectedPage("Dictionary")} style={linkStyle}>Dictionary</li>

        </ul>

      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        {renderPage()}
      </div>
    </div>
  );
};

const linkStyle = {
  padding: "10px",
  cursor: "pointer",
  borderBottom: "1px solid #444",
  marginBottom: "5px"
};

export default Dashboard;

