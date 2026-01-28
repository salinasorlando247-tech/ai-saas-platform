import React, { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/ai`, { prompt });
      setResponse(res.data.result);
    } catch (err) {
      console.error(err);
      setResponse('Error calling AI backend');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>AI SaaS Frontend</h1>
      <textarea
        rows="4"
        cols="50"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter prompt here..."
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <h2>Response:</h2>
      <pre>{response}</pre>
    </div>
  );
}
