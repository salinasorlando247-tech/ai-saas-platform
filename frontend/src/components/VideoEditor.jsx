import React, { useState } from "react";
import axios from "axios";

const VideoEditor = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [editedVideoURL, setEditedVideoURL] = useState("");
  const [instruction, setInstruction] = useState(""); // AI instruction input
  const [clips, setClips] = useState([]);

  // Upload video
  const handleFileChange = e => setVideoFile(e.target.files[0]);

  // Send video + instruction to AI backend
  const uploadAndEdit = async () => {
    if (!videoFile) return alert("Select a video first!");

    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("instruction", instruction);

    const res = await axios.post(
      "http://localhost:5001/api/edit-video-multi",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    setEditedVideoURL(res.data.editedVideoUrl);

    // AI can return multiple short clips if requested
    if (res.data.clips) setClips(res.data.clips);
  };

  // Like video → auto publish
  const likeVideo = async () => {
    await axios.post("http://localhost:5001/api/publish-video", {
      videoURL: editedVideoURL,
      day: "Friday", // replace with client-selected day
      clientID: "client_123",
      videoMeta: { hashtags: ["#Manual"], cta: "Watch Now!", effects: [] }
    });
    alert("Video liked and scheduled at best time!");
  };

  return (
    <div className="manual-video-editor">
      <h3>Manual Video Editor (Fully AI-Powered)</h3>

      <input type="file" accept="video/*" onChange={handleFileChange} />
      <textarea
        placeholder="Describe any edit: clip, speed, darken, add overlay, special effects..."
        value={instruction}
        onChange={e => setInstruction(e.target.value)}
        rows={4}
        style={{ width: "100%", marginTop: "10px" }}
      />
      <button onClick={uploadAndEdit} style={{ marginTop: "10px" }}>
        Upload & Apply AI Edits
      </button>

      {editedVideoURL && (
        <div style={{ marginTop: "20px" }}>
          <h4>Edited Video</h4>
          <video src={editedVideoURL} controls width="500" />
          <div className="effect-row" style={{ marginTop: "10px" }}>
            <button onClick={likeVideo}>I Like This Video</button>
            <button onClick={() => alert("AI will re-edit based on your new instructions")}>
              Dislike / Change Video
            </button>
          </div>
        </div>
      )}

      {clips.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h4>Short-Form Clips Generated</h4>
          {clips.map((clip, i) => (
            <video key={i} src={clip} controls width="300" style={{ margin: "5px" }} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoEditor;
