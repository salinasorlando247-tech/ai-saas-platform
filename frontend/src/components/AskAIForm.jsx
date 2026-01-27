import React, { useState } from "react";
import axios from "axios";

export default function AskAIForm() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAsk = async () => {
    if (!question) return;
    const res = await axios.post("http://localhost:5000/predict", { content: question });
    setAnswer(`Predicted engagement: ${res.data.predictedEngagement}`);
  };

  return (
    <div>
      <h2>Ask AI</h2>
      <input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask a question..." />
      <button onClick={handleAsk}>Ask</button>
      {answer && <p>{answer}</p>}
    </div>
  );
}
