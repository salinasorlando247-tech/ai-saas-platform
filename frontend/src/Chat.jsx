import React, { useState, useRef, useEffect } from "react";

export default function Chat() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  useEffect(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), [messages]);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: prompt }]);
    setPrompt("");
    setIsLoading(true);
    const aiMessage = { role: "ai", content: "" };
    setMessages((prev) => [...prev, aiMessage]);

    try {
      const res = await fetch(`${BACKEND_URL}/api/ai-stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let fullText = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;
        setMessages((prev) =>
          prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: fullText } : m))
        );
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) =>
        prev.map((m, i) =>
          i === prev.length - 1 ? { ...m, content: "Error connecting to backend" } : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ height: "400px", overflowY: "auto", padding: "1rem", borderRadius: "16px", background: "rgba(255,255,255,0.05)" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: "0.5rem" }}>
            <div style={{ maxWidth: "70%", padding: "0.75rem 1rem", borderRadius: "16px", background: m.role === "user" ? "#0ff" : "rgba(255,255,255,0.1)", color: m.role === "user" ? "#000" : "#fff" }}>{m.content}</div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows="3" style={{ flex: 1, padding: "0.5rem", borderRadius: "12px", background: "rgba(255,255,255,0.05)", color: "#0ff", border: "1px solid #0ff" }} disabled={isLoading} />
        <button onClick={handleSubmit} disabled={isLoading} style={{ padding: "0 1rem", borderRadius: "12px", border: "none", background: "#0ff", color: "#000", fontWeight: "bold", cursor: "pointer" }}>{isLoading ? "AI is typing..." : "Send"}</button>
      </div>
    </div>
  );
}
