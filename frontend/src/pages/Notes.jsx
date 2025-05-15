// import { useState, useEffect } from "react";
// import axios from "axios";

// const Notes = () => {
//   const [title, setTitle] = useState("");
//   const [subject, setSubject] = useState("");
//   const [content, setContent] = useState("");
//   const [summary, setSummary] = useState("");
//   const [notes, setNotes] = useState([]);
//   const [editingNote, setEditingNote] = useState(null);

//   // ✅ Fetch all saved notes when the page loads
//   useEffect(() => {
//     fetchNotes();
//   }, []);

//   const fetchNotes = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/notes/all");
//       setNotes(response.data);
//     } catch (error) {
//       console.error("❌ Error fetching notes:", error);
//     }
//   };

//   const handleSummarize = async () => {
//     if (!title || !subject || !content.trim()) {
//       alert("Please enter all fields.");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:5000/api/notes/summarize", {
//         title,
//         subject,
//         text: content
//       });

//       setSummary(response.data.summary);
//       alert("✅ Note saved successfully!");
//       fetchNotes(); // Refresh notes list after saving
//     } catch (error) {
//       console.error("❌ Error summarizing:", error);
//       alert("Failed to summarize note.");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this note?")) return;

//     try {
//       await axios.delete(`http://localhost:5000/api/notes/delete/${id}`);
//       alert("✅ Note deleted successfully!");
//       fetchNotes();
//     } catch (error) {
//       console.error("❌ Error deleting note:", error);
//       alert("Failed to delete note.");
//     }
//   };

//   const handleEdit = (note) => {
//     setEditingNote(note._id);
//     setTitle(note.title);
//     setSubject(note.subject);
//     setContent(note.content);
//   };

//   const handleUpdate = async () => {
//     if (!editingNote) return;

//     try {
//       await axios.put(`http://localhost:5000/api/notes/update/${editingNote}`, {
//         title,
//         subject,
//         content
//       });

//       alert("✅ Note updated successfully!");
//       setEditingNote(null);
//       setTitle("");
//       setSubject("");
//       setContent("");
//       fetchNotes();
//     } catch (error) {
//       console.error("❌ Error updating note:", error);
//       alert("Failed to update note.");
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "20px" }}>
//       <h1>Notes Page</h1>

//       <input 
//         type="text" 
//         placeholder="Enter Title" 
//         value={title} 
//         onChange={(e) => setTitle(e.target.value)} 
//         style={{ display: "block", margin: "10px auto", width: "300px" }}
//       />

//       <input 
//         type="text" 
//         placeholder="Enter Subject" 
//         value={subject} 
//         onChange={(e) => setSubject(e.target.value)} 
//         style={{ display: "block", margin: "10px auto", width: "300px" }}
//       />

//       <textarea 
//         placeholder="Write your note here..." 
//         value={content} 
//         onChange={(e) => setContent(e.target.value)} 
//         style={{ display: "block", margin: "10px auto", width: "300px", height: "100px" }}
//       />

//       {editingNote ? (
//         <button onClick={handleUpdate} style={{ marginTop: "10px" }}>Update Note</button>
//       ) : (
//         <button onClick={handleSummarize} style={{ marginTop: "10px" }}>Summarize & Save</button>
//       )}

//       {summary && (
//         <div style={{ marginTop: "20px", padding: "10px", backgroundColor: "#f3f3f3" }}>
//           <h3>AI Summary:</h3>
//           <p>{summary}</p>
//         </div>
//       )}

//       {/* ✅ Display saved notes */}
//       <h2 style={{ marginTop: "30px" }}>Your Saved Notes</h2>
//       <div style={{ maxWidth: "600px", margin: "auto" }}>
//         {notes.map((note) => (
//           <div key={note._id} style={{ padding: "10px", border: "1px solid gray", margin: "10px 0" }}>
//             <h3>{note.title} ({note.subject})</h3>
//             <p><strong>Content:</strong> {note.content}</p>
//             <p><strong>Summary:</strong> {note.summary}</p>
//             <button onClick={() => handleEdit(note)} style={{ marginRight: "10px" }}>Edit</button>
//             <button onClick={() => handleDelete(note._id)} style={{ backgroundColor: "red", color: "white" }}>Delete</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Notes;






































// import { useState, useEffect } from "react";
// import axios from "axios";

// const Notes = () => {
//   const [title, setTitle] = useState("");
//   const [subject, setSubject] = useState("");
//   const [content, setContent] = useState("");
//   const [notes, setNotes] = useState([]);
//   const [editingNote, setEditingNote] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     fetchNotes();
//   }, []);

//   const fetchNotes = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get("http://localhost:5000/api/notes/all");
//       setNotes(response.data);
//     } catch (error) {
//       console.error("❌ Error fetching notes:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSummarize = async () => {
//     if (!title || !subject || !content.trim()) {
//       alert("Please enter all fields.");
//       return;
//     }
//     setLoading(true);
//     try {
//       await axios.post("http://localhost:5000/api/notes/summarize", {
//         title,
//         subject,
//         text: content
//       });
//       alert("✅ Note saved successfully!");
//       fetchNotes();
//     } catch (error) {
//       console.error("❌ Error summarizing:", error);
//       alert("Failed to summarize note.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this note?")) return;

//     setLoading(true);
//     try {
//       await axios.delete(`http://localhost:5000/api/notes/delete/${id}`);
//       alert("✅ Note deleted successfully!");
//       fetchNotes();
//     } catch (error) {
//       console.error("❌ Error deleting note:", error);
//       alert("Failed to delete note.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (note) => {
//     setEditingNote(note._id);
//     setTitle(note.title);
//     setSubject(note.subject);
//     setContent(note.content);
//     setShowModal(true);
//   };

//   const handleUpdate = async () => {
//     if (!editingNote) return;

//     setLoading(true);
//     try {
//       await axios.put(`http://localhost:5000/api/notes/update/${editingNote}`, {
//         title,
//         subject,
//         content
//       });

//       alert("✅ Note updated successfully!");
//       setEditingNote(null);
//       setShowModal(false);
//       fetchNotes();
//     } catch (error) {
//       console.error("❌ Error updating note:", error);
//       alert("Failed to update note.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-5">
//       <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
//         <h1 className="text-3xl font-bold text-center text-blue-600">AINotes</h1>

//         <input 
//           type="text" 
//           placeholder="Enter Title" 
//           value={title} 
//           onChange={(e) => setTitle(e.target.value)} 
//           className="w-full p-2 border rounded mt-3"
//         />

//         <input 
//           type="text" 
//           placeholder="Enter Subject" 
//           value={subject} 
//           onChange={(e) => setSubject(e.target.value)} 
//           className="w-full p-2 border rounded mt-3"
//         />

//         <textarea 
//           placeholder="Write your note here..." 
//           value={content} 
//           onChange={(e) => setContent(e.target.value)} 
//           className="w-full p-2 border rounded mt-3 h-32"
//         />

//         {editingNote ? (
//           <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 mt-3 rounded">Update Note</button>
//         ) : (
//           <button onClick={handleSummarize} className="bg-blue-500 text-white px-4 py-2 mt-3 rounded">Summarize & Save</button>
//         )}

//         {loading && <p className="text-center text-gray-500 mt-3">Loading...</p>}
//       </div>

//       {/* ✅ Notes List */}
//       <div className="max-w-2xl mx-auto mt-6">
//         <h2 className="text-xl font-semibold">Your Saved Notes</h2>
//         {loading ? (
//           <p className="text-center">Loading notes...</p>
//         ) : (
//           notes.map((note) => (
//             <div key={note._id} className="p-4 bg-white shadow rounded mt-3">
//               <h3 className="text-lg font-bold">{note.title} ({note.subject})</h3>
//               <p className="text-sm text-gray-600"><strong>Content:</strong> {note.content}</p>
//               <p className="text-sm text-gray-600"><strong>Summary:</strong> {note.summary}</p>
//               <button onClick={() => handleEdit(note)} className="bg-yellow-500 text-white px-3 py-1 mt-2 mr-2 rounded">Edit</button>
//               <button onClick={() => handleDelete(note._id)} className="bg-red-500 text-white px-3 py-1 mt-2 rounded">Delete</button>
//             </div>
//           ))
//         )}
//       </div>

//       {/* ✅ Modal for Editing Notes */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-5 rounded-lg shadow-lg">
//             <h2 className="text-xl font-bold mb-3">Edit Note</h2>
//             <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" />
//             <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full p-2 border rounded mt-2" />
//             <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full p-2 border rounded mt-2 h-24" />
//             <div className="flex justify-between mt-3">
//               <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
//               <button onClick={() => setShowModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Notes;


















import { useState, useEffect } from "react";
import axios from "axios";

const Notes = () => {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/notes/all");
      setNotes(response.data);
    } catch (error) {
      console.error("❌ Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSummarize = async () => {
    if (!title || !subject || !content.trim()) {
      alert("Please enter all fields.");
      return;
    }
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/notes/summarize", {
        title,
        subject,
        text: content,
      });
      alert("✅ Note saved successfully!");
      fetchNotes();
    } catch (error) {
      console.error("❌ Error summarizing:", error);
      alert("Failed to summarize note.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/notes/delete/${id}`);
      alert("✅ Note deleted successfully!");
      fetchNotes();
    } catch (error) {
      console.error("❌ Error deleting note:", error);
      alert("Failed to delete note.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (note) => {
    setEditingNote(note._id);
    setTitle(note.title);
    setSubject(note.subject);
    setContent(note.content);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    if (!editingNote) return;

    setLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/notes/update/${editingNote}`, {
        title,
        subject,
        content,
      });

      alert("✅ Note updated successfully!");
      setEditingNote(null);
      setShowModal(false);
      fetchNotes();
    } catch (error) {
      console.error("❌ Error updating note:", error);
      alert("Failed to update note.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Internal CSS Styles
  const styles = {
    container: {
      minHeight: "100vh",
      padding: "20px",
      backgroundColor: "#f4f7fc",
      fontFamily: "Arial, sans-serif",
    },
    card: {
      maxWidth: "600px",
      margin: "20px auto",
      padding: "20px",
      backgroundColor: "white",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginTop: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
    button: {
      width: "100%",
      padding: "12px",
      marginTop: "10px",
      borderRadius: "5px",
      border: "none",
      fontSize: "16px",
      cursor: "pointer",
    },
    notesList: {
      maxWidth: "600px",
      margin: "20px auto",
    },
    noteCard: {
      backgroundColor: "white",
      padding: "15px",
      borderRadius: "8px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      marginTop: "15px",
    },
    deleteButton: {
      backgroundColor: "red",
      color: "white",
      padding: "8px",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
      marginLeft: "5px",
    },
    editButton: {
      backgroundColor: "orange",
      color: "white",
      padding: "8px",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
    },
    modal: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      width: "80%",
      maxWidth: "400px",
    },
    modalOverlay: {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={{ textAlign: "center", color: "#007bff" }}>AINotes</h1>

        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />

        <input
          type="text"
          placeholder="Enter Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={styles.input}
        />

        <textarea
          placeholder="Write your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ ...styles.input, height: "100px" }}
        />

        <button
          onClick={editingNote ? handleUpdate : handleSummarize}
          style={{
            ...styles.button,
            backgroundColor: editingNote ? "green" : "#007bff",
            color: "white",
          }}
        >
          {editingNote ? "Update Note" : "Summarize & Save"}
        </button>

        {loading && <p style={{ textAlign: "center", color: "#777" }}>Loading...</p>}
      </div>

      {/* ✅ Notes List */}
      <div style={styles.notesList}>
        <h2 style={{ textAlign: "center" }}>Your Saved Notes</h2>
        {notes.map((note) => (
          <div key={note._id} style={styles.noteCard}>
            <h3>{note.title} ({note.subject})</h3>
            <p><strong>Content:</strong> {note.content}</p>
            <p><strong>Summary:</strong> {note.summary}</p>
            <button onClick={() => handleEdit(note)} style={styles.editButton}>Edit</button>
            <button onClick={() => handleDelete(note._id)} style={styles.deleteButton}>Delete</button>
          </div>
        ))}
      </div>

      {/* ✅ Edit Modal */}
      {showModal && (
        <div>
          <div style={styles.modalOverlay} onClick={() => setShowModal(false)}></div>
          <div style={styles.modal}>
            <h2>Edit Note</h2>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={styles.input} />
            <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} style={styles.input} />
            <textarea value={content} onChange={(e) => setContent(e.target.value)} style={{ ...styles.input, height: "100px" }} />
            <button onClick={handleUpdate} style={{ ...styles.button, backgroundColor: "green", color: "white" }}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;














