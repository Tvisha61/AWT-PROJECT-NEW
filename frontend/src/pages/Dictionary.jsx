import { useState } from "react";
import axios from "axios";

const Dictionary = () => {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState(null);
  const [error, setError] = useState("");

  const fetchMeaning = async () => {
    if (!word.trim()) {
      setError("Please enter a word.");
      return;
    }

    try {
      const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const definitions = res.data[0]?.meanings[0]?.definitions;

      if (definitions && definitions.length > 0) {
        setMeaning(definitions[0].definition);
        setError("");
      } else {
        setMeaning(null);
        setError("No definition found.");
      }
    } catch (err) {
      console.error("Error fetching word meaning:", err); // ✅ now used!
      setMeaning(null);
      setError("Word not found or error fetching data.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📖 Dictionary Helper</h2>
      <input
        type="text"
        placeholder="Enter a word"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        style={styles.input}
      />
      <button onClick={fetchMeaning} style={styles.button}>🔍 Get Meaning</button>

      {error && <p style={styles.error}>{error}</p>}

      {meaning && (
        <div style={styles.resultBox}>
          <h3>📝 Meaning of &quot;{word}&quot;:</h3>
          <p>{meaning}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    maxWidth: "500px",
    margin: "auto",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "1.6rem",
    marginBottom: "20px",
  },
  input: {
    width: "80%",
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 15px",
    marginLeft: "10px",
    fontSize: "1rem",
    backgroundColor: "#007acc",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  resultBox: {
    marginTop: "20px",
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "6px",
    textAlign: "left",
    border: "1px solid #eee",
  },
  error: {
    color: "red",
    marginTop: "15px",
  },
};

export default Dictionary;
