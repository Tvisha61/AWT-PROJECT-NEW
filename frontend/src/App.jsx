import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Notes from "./pages/Notes";
import VoiceToText from "./pages/VoiceToText";
import KeywordExtraction from "./pages/KeywordExtraction";
import Flashcards from "./pages/Flashcards"; 
import InformationPage from "./pages/InformationPage";
import Dashboard from "./pages/Dashboard";
import RemindersPage from './pages/RemindersPage';
import Dictionary from "./pages/Dictionary";
import SmartReminder from './components/SmartReminder';
import TextToSpeech from './pages/TextToSpeech';
import FileSummarizer from './pages/FileSummarizer';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/voice" element={<VoiceToText />} />
        <Route path="/keyword-extraction" element={<KeywordExtraction />} />
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="/info" element={<InformationPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/smart-reminders" exact component={SmartReminder} />
        <Route path="/dictionary" element={<Dictionary />} />
        <Route path="/reminders" element={<RemindersPage />} />
        <Route path="/textToSpeech" element={<TextToSpeech />} />
        <Route path="/fileSummarizer" element={<FileSummarizer />} />

      </Routes>
    </Router>
  );
};

export default App;



