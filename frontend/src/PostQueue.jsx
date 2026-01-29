import React, { useEffect, useState } from "react";
import axios from "axios";
import Platforms from "./Platforms.jsx";

export default function PostQueue() {
  const [queue, setQueue] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState(["YouTube", "TikTok"]);

  useEffect(() => {
    fetchQueue();
  }, []);

  const fetchQueue = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/queue");
      setQueue(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePostNow = async (postId) => {
    try {
      await axios.post(`http://localhost:5000/api/post`, { postId, platforms: selectedPlatforms });
      alert("Post sent to selected platforms!");
      fetchQueue();
    } catch (err) {
      console.error(err);
      alert("Failed to post");
    }
  };

  return (
    <div className="post-queue">
      <h2>Post Queue</h2>
      <Platforms selected={selectedPlatforms} setSelected={setSelectedPlatforms} />
      {queue.length === 0 && <p>No posts in queue</p>}
      <ul>
        {queue.map((post) => (
          <li key={post.id} className="queue-item">
            <span>{post.title}</span>
            <span>Status: {post.status}</span>
            <span>Platforms: {post.platforms.join(", ")}</span>
            <button onClick={() => handlePostNow(post.id)}>Post Now</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
