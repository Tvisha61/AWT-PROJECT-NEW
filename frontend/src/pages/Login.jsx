// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      
//       // ✅ Store user data in local storage
//       localStorage.setItem("user", JSON.stringify(res.data.user));

//       alert(res.data.message);
//       navigate("/notes"); // ✅ Redirect to Notes page
//     } catch (error) {
//       alert(error.response.data.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Login</h2>
//       <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
//       <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;

import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";


const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      
      // ✅ Store user data in local storage
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert(res.data.message);
      navigate("/dashboard"); // ✅ Redirect to Notes page
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
    forgotPassword: {
      marginTop: "10px",
      color: "#0099ff",
      fontSize: "14px",
      cursor: "pointer",
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
          <Link to="/signup" style={styles.link}>Signup</Link>
        </div>
      </nav>

      {/* ✅ Login Form */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Login</h2>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required style={styles.input} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required style={styles.input} />
        <button type="submit" style={styles.button}>Login</button>

        {/* ✅ Forgot Password / Reset Password */}
        <p style={styles.forgotPassword} onClick={() => alert("Reset Password feature coming soon!")}>
          Forgot Password?
        </p>
      </form>

    </div>
  );
};

export default Login;
