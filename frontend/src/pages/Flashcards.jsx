import { useState, useEffect } from "react";
import axios from "axios";

const Flashcards = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  // ✅ Fetch all flashcards
  const fetchFlashcards = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/flashcards");
      setFlashcards(response.data);
    } catch (error) {
      console.error("❌ Error fetching flashcards:", error);
    }
  };

  // ✅ Create a new flashcard
  const handleCreateFlashcard = async () => {
    if (!question || !answer) {
      alert("Please enter both question and answer!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/flashcards", { question, answer });
      alert("✅ Flashcard created!");
      fetchFlashcards();
      setQuestion("");
      setAnswer("");
    } catch (error) {
      console.error("❌ Error creating flashcard:", error);
    }
  };

  // ✅ Delete a flashcard
  const handleDeleteFlashcard = async (id) => {
    if (!window.confirm("Are you sure you want to delete this flashcard?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/flashcards/${id}`);
      alert("✅ Flashcard deleted!");
      fetchFlashcards();
    } catch (error) {
      console.error("❌ Error deleting flashcard:", error);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px", textAlign: "center" }}>
      <h2 style={{ color: "#0099ff" }}>📚 Flashcards</h2>

      <input
        type="text"
        placeholder="Enter Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ddd" }}
      />

      <input
        type="text"
        placeholder="Enter Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ddd" }}
      />

      <button
        onClick={handleCreateFlashcard}
        style={{ padding: "10px 20px", backgroundColor: "#0099ff", color: "white", border: "none", cursor: "pointer" }}
      >
        Create Flashcard
      </button>

      <div style={{ marginTop: "20px" }}>
        <h3>📝 Your Flashcards</h3>
        {flashcards.map((card) => (
          <div key={card._id} style={{ padding: "10px", marginTop: "10px", border: "1px solid #ddd" }}>
            <p><strong>Q:</strong> {card.question}</p>
            <p><strong>A:</strong> {card.answer}</p>
            <button
              onClick={() => handleDeleteFlashcard(card._id)}
              style={{ backgroundColor: "red", color: "white", padding: "5px 10px", border: "none", cursor: "pointer" }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Flashcards;
