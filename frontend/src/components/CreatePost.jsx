import React, { useState } from "react";

function CreatePost() {
  const [content, setContent] = useState("");

  const handleCreate = () => alert(`Post Created: ${content}`);

  return (
    <div className="card futuristic-card">
      <h2>Create Post</h2>
      <textarea
        placeholder="Type your post..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="futuristic-input"
      />
      <button className="futuristic-btn" onClick={handleCreate}>
        Create
      </button>
    </div>
  );
}

export default CreatePost;
