import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PostDisplay({ refresh }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/posts").then(res => setPosts(res.data));
  }, [refresh]);

  return (
    <div className="post-display">
      <h2>Posts</h2>
      {posts.map(post => (
        <div key={post.id} className="post-card">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <small>Scheduled: {post.scheduledTime}</small>
        </div>
      ))}
    </div>
  );
}
