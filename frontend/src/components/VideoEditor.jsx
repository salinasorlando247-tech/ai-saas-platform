import React, { useState } from "react";
import axios from "axios";

export default function VideoEditor({ videoPath, refreshQueue }) {
  const [instructions, setInstructions] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEdit = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/video/edit", {
        videoPath,
        instructions,
      });
      alert(`Video edited successfully: ${res.data.editedVideo}`);
      refreshQueue();
    } catch (err) {
      console.error(err);
      alert("AI editing failed: " + err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: 20 }}>
      <textarea
        placeholder="Enter instructions (e.g., turn me into a cyborg)"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        style={{ width: "100%", height: 80 }}
      />
      <button onClick={handleEdit} disabled={loading}>
        {loading ? "Editing..." : "AI Edit Video"}
      </button>
    </div>
  );
}
