import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Home = () => {
  useEffect(() => {
    // ✅ Smooth scrolling for "About Us"
    const handleSmoothScroll = (event) => {
      event.preventDefault();
      const targetId = event.target.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        window.scrollTo({ top: targetElement.offsetTop - 50, behavior: "smooth" });
      }
    };

    document.querySelectorAll("a[href^='#']").forEach((anchor) => {
      anchor.addEventListener("click", handleSmoothScroll);
    });

    return () => {
      document.querySelectorAll("a[href^='#']").forEach((anchor) => {
        anchor.removeEventListener("click", handleSmoothScroll);
      });
    };
  }, []);

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 300);
  }, []);

  // ✅ Internal CSS styles
  const styles = {
    container: {
      width: "100%",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      color: "#0099ff",
      overflow: "hidden",
      position: "relative",
    },
    navbar: {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 50px",
      backgroundColor: "#0099ff",
      color: "white",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      zIndex: "1000",
    },
    brand: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      fontFamily: "cursive",
      textShadow: "3px 3px 10px rgba(255, 165, 0, 0.8), -3px -3px 10px rgba(0, 255, 255, 0.8)",
    },
    button: {
      backgroundColor: "white",
      color: "#0099ff",
      padding: "12px 24px",
      fontSize: "18px",
      fontWeight: "bold",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      transition: "all 0.3s",
    },
    content: {
      textAlign: "center",
      zIndex: "10",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      opacity: animate ? 1 : 0,
      transform: animate ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 1s ease-out, transform 1s ease-out",
      position: "relative",
    },
    waveContainer: {
      position: "absolute",
      bottom: "0",
      width: "100%",
      animation: "waveMove 6s infinite linear",
    },
    "@keyframes waveMove": {
      "0%": { transform: "translateX(0)" },
      "100%": { transform: "translateX(-50%)" },
    },
  };

  return (
    <div style={styles.container}>
      {/* ✅ Stylish Navigation Bar */}
      <nav style={styles.navbar}>
        <div style={styles.brand}>AINOTES</div>
        <div>
          <a href="#about" style={{ color: "white", textDecoration: "none", fontSize: "18px", cursor: "pointer", marginRight: "20px" }}>About Us</a>
          <Link to="/signup"><button style={styles.button}>Signup</button></Link>
          <Link to="/login"><button style={{ ...styles.button, marginLeft: "10px" }}>Login</button></Link>
        </div>
      </nav>

      {/* ✅ Centered Content with Animation */}
      <div style={styles.content}>
        <h1 style={{ fontSize: "4rem", fontWeight: "bold" }}>Welcome to AINotes</h1>
        <p style={{ fontSize: "1.5rem", marginTop: "10px" }}>Your smart AI-powered note-taking assistant.</p>
      </div>

      {/* ✅ Moving Waves */}
      <div style={styles.waveContainer}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#0099ff" fillOpacity="1" d="M0,256L60,250.7C120,245,240,235,360,218.7C480,203,600,181,720,181.3C840,181,960,203,1080,224C1200,245,1320,267,1380,277.3L1440,288V320H1380C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320H0Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Home;


