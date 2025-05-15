// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
//   const [formData, setFormData] = useState({ name: "", email: "", password: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/auth/signup", formData);
//       alert("Signup Successful! Please login.");
//       navigate("/login");
//     } catch (error) {
//       alert(error.response.data.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Signup</h2>
//       <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
//       <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
//       <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
//       <button type="submit">Signup</button>
//     </form>
//   );
// };

// export default Signup;

import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/signup", formData);
      alert("Signup Successful! Please login.");
      navigate("/login");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  // ✅ Internal CSS Styles
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#f0f4f8",
    },
    form: {
      backgroundColor: "white",
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      width: "350px",
    },
    input: {
      width: "100%",
      padding: "12px",
      margin: "10px 0",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#0099ff",
      color: "white",
      fontSize: "16px",
      fontWeight: "bold",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
      transition: "0.3s",
    },
    googleButton: {
      marginTop: "10px",
      backgroundColor: "#db4437",
    },
    navbar: {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      padding: "20px 50px",
      backgroundColor: "#0099ff",
      color: "white",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    },
    brand: {
      fontSize: "2rem",
      fontWeight: "bold",
      fontFamily: "cursive",
      textShadow: "3px 3px 10px rgba(255, 165, 0, 0.8), -3px -3px 10px rgba(0, 255, 255, 0.8)",
    },
    link: {
      color: "white",
      textDecoration: "none",
      fontSize: "18px",
      marginLeft: "20px",
    },
  };

  return (
    <div style={styles.container}>
      {/* ✅ Navigation Bar (Same as Home Page) */}
      <nav style={styles.navbar}>
        <div style={styles.brand}>AINOTES</div>
        <div>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/login" style={styles.link}>Login</Link>
        </div>
      </nav>

      {/* ✅ Signup Form */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Signup</h2>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required style={styles.input} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required style={styles.input} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required style={styles.input} />
        <button type="submit" style={styles.button}>Signup</button>

        {/* ✅ Signup with Google */}
        <button type="button" style={{ ...styles.button, ...styles.googleButton }}>Signup with Google</button>
      </form>
    </div>
  );
};

export default Signup;
