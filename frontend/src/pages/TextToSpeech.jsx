// // frontend/src/pages/TextToSpeech.jsx
// import { useState } from 'react';
// import axios from 'axios';

// const TextToSpeech = () => {
//   const [text, setText] = useState('');

//   const speakText = () => {
//     const utterance = new SpeechSynthesisUtterance(text);
//     speechSynthesis.speak(utterance);
//   };

//   const handleSubmit = async () => {
//     try {
//       await axios.post('http://localhost:5000/api/texts', { text });
//       alert('Text saved to database!');
//     } catch (error) {
//       console.error('Error saving text:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Text to Voice</h2>
//       <textarea
//         rows="5"
//         cols="40"
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Type something..."
//       ></textarea>
//       <br />
//       <button onClick={speakText}>Speak</button>
//       <button onClick={handleSubmit}>Save to DB</button>
//     </div>
//   );
// };

// export default TextToSpeech;

import { useState, useEffect } from 'react';
import axios from 'axios';

const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [savedTexts, setSavedTexts] = useState([]);

  const speakText = (msg) => {
    const utterance = new SpeechSynthesisUtterance(msg);
    speechSynthesis.speak(utterance);
  };

  const fetchTexts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/texts');
      setSavedTexts(res.data);
    } catch (err) {
      console.error('Failed to fetch texts:', err);
    }
  };

  const handleSubmit = async () => {
    if (!text.trim()) return;

    try {
      await axios.post('http://localhost:5000/api/texts', { text });
      setText('');
      fetchTexts();
    } catch (err) {
      console.error('Error saving text:', err);
    }
  };

  useEffect(() => {
    fetchTexts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">🗣️ Text to Voice App</h2>

        <textarea
          rows="4"
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something to speak..."
        />

        <div className="flex gap-4 justify-center mb-6">
          <button
            onClick={() => speakText(text)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl"
          >
            🔊 Speak
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl"
          >
            💾 Save
          </button>
        </div>

        <ul className="space-y-3 max-h-60 overflow-y-auto">
          {savedTexts.map((item) => (
            <li
              key={item._id}
              className="bg-gray-50 p-3 rounded-md flex justify-between items-center border"
            >
              <span className="text-gray-800">{item.text}</span>
              <button
                onClick={() => speakText(item.text)}
                className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded"
              >
                🔈 Speak
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TextToSpeech;


