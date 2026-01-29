import React, { useState } from "react";
import axios from "axios";

function VideoEditor({ userId }) {
  const [videoFile, setVideoFile] = useState(null);
  const [instructions, setInstructions] = useState("");
  const [platform, setPlatform] = useState("YouTube");

  const handleSubmit = async () => {
    if (!videoFile) return alert("Select a video first");
    const formData = new FormData();
    formData.append("videoFile", videoFile);
    formData.append("editInstructions", instructions);
    formData.append("platform", platform);
    formData.append("autoPost", true);

    try {
      const res = await axios.post("http://localhost:5000/edit-video", formData);
      alert(`Video ready: ${res.data.videoName}`);
    } catch (err) {
      console.error(err);
      alert("Video editing failed");
    }
  };

  return (
    <div>
      <h2>Video Editor</h2>
      <input type="file" accept="video/*" onChange={e => setVideoFile(e.target.files[0])} />
      <input type="text" placeholder="Edit instructions" value={instructions} onChange={e => setInstructions(e.target.value)} />
      <select value={platform} onChange={e => setPlatform(e.target.value)}>
        <option>YouTube</option>
        <option>Instagram</option>
        <option>TikTok</option>
        <option>LinkedIn</option>
        <option>Snapchat</option>
      </select>
      <button onClick={handleSubmit}>Create/Edit Video</button>
    </div>
  );
}

export default VideoEditor;
