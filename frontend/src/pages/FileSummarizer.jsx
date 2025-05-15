import { useState } from 'react';
import axios from 'axios';

const FileSummarizer = () => {
  const [fileContent, setFileContent] = useState('');
  const [summary, setSummary] = useState('');

  const handleFileRead = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const content = event.target.result;
        setFileContent(content);

        try {
          const res = await axios.post('http://localhost:5000/api/summarize', { content });
          setSummary(res.data.summary);
        } catch (err) {
          console.error('Summarization failed:', err);
        }
      };
      reader.readAsText(file);
    } else {
      alert('Please upload a valid .txt file');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>📂 File Summarizer</h2>
      <input type="file" accept=".txt" onChange={handleFileRead} />

      {fileContent && (
        <>
          <h3>📄 File Content</h3>
          <pre>{fileContent}</pre>
        </>
      )}

      {summary && (
        <>
          <h3>🧠 Summary</h3>
          <p>{summary}</p>
        </>
      )}
    </div>
  );
};

export default FileSummarizer;
