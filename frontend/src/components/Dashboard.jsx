import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [videos, setVideos] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [title, setTitle] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [userToken, setUserToken] = useState(localStorage.getItem("token"));
  const [remainingCredits, setRemainingCredits] = useState(0);

  const loadVideos = async () => {
    try {
      const res = await axios.get("/api/videos", {
        headers: { Authorization: `Bearer ${userToken}` }
      });
      setVideos(res.data.videos);
      setRemainingCredits(res.data.credits);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  const handleCreateVideo = async () => {
    if (!prompt) return alert("Enter a prompt");
    try {
      const res = await axios.post("/api/videos/create",
        { prompt, title, scheduled_at: scheduledAt || null },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      setPrompt("");
      setTitle("");
      setScheduledAt("");
      setRemainingCredits(res.data.remainingCredits);
      loadVideos();
    } catch (err) {
      alert(err.response?.data?.error || "Error creating video");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard</h1>
      <p>Remaining Credits: {remainingCredits}</p>

      {/* Video creation */}
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Video title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <input
          type="text"
          placeholder="Prompt for AI video"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <input
          type="datetime-local"
          value={scheduledAt}
          onChange={(e) => setScheduledAt(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <button onClick={handleCreateVideo}>Create Video</button>
      </div>

      {/* Video queue */}
      <div>
        <h2>Your Videos</h2>
        {videos.length === 0 && <p>No videos yet.</p>}
        <ul>
          {videos.map((v) => (
            <li key={v.id}>
              <strong>{v.title}</strong> | Status: {v.status} | Progress: {v.progress}%
              {v.scheduled_at && ` | Scheduled: ${new Date(v.scheduled_at).toLocaleString()}`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
