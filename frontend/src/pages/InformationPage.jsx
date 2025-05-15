import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const InformationPage = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Get the logged-in username from localStorage
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.name) {
      setUsername(userData.name);
    } else {
      navigate("/login"); // Redirect if no user is found
    }
  }, [navigate]);

  // ✅ Internal CSS
  const styles = {
    container: {
      textAlign: "center",
      padding: "40px",
      maxWidth: "600px",
      margin: "auto",
      backgroundColor: "white",
      borderRadius: "10px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    },
    title: { fontSize: "2rem", fontWeight: "bold", color: "#0099ff" },
    username: { fontSize: "1.2rem", fontWeight: "bold", margin: "10px 0" },
    buttonContainer: { display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" },
    button: {
      padding: "12px 20px",
      fontSize: "16px",
      fontWeight: "bold",
      color: "white",
      backgroundColor: "#0099ff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      textDecoration: "none",
      display: "inline-block",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome, {username}!</h1>
      <p style={styles.username}>Choose a feature to get started:</p>

      <div style={styles.buttonContainer}>
        <Link to="/notes" style={styles.button}>📝 Notes</Link>
        <Link to="/voice" style={styles.button}>🎙 Voice to Text</Link>
        <Link to="/keyword-extraction" style={styles.button}>🔑 Keyword Extraction</Link>
        <Link to="/flashcards" style={styles.button}>📚 Flashcards</Link>
      </div>
    </div>
  );
};

export default InformationPage;
