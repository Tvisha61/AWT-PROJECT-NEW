import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ backgroundColor: "#0099ff", padding: "15px", display: "flex", justifyContent: "space-between" }}>
      <h1 style={{ color: "white" }}>AINotes</h1>
      <div>
        <Link to="/" style={{ color: "white", margin: "0 15px" }}>Home</Link>
        <Link to="/notes" style={{ color: "white", margin: "0 15px" }}>Notes</Link>
        <Link to="/flashcards" style={{ color: "white", margin: "0 15px" }}>Flashcards</Link> {/* ✅ Flashcards Link */}
      </div>
    </nav>
  );
};

export default Navbar;
