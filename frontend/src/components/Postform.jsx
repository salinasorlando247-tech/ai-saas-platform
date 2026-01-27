import React, { useState } from "react";
import axios from "axios";

export default function PostForm({ triggerRefresh }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/posts", { title, content, scheduledTime });
    setTitle(""); setContent(""); setScheduledTime("");
    triggerRefresh();
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" required />
      <input type="datetime-local" value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)} required />
      <button type="submit">Create Post</button>
    </form>
  );
}
