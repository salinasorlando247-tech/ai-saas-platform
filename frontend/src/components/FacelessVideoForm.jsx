import { useState } from "react";
import axios from "axios";

export default function FacelessVideoForm({ userTier }) {
  const [script, setScript] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/faceless/create", {
      script,
      avatar: "default",
      voice: "en-US-1",
      template: "basic",
      platform: "youtube",
      tier: userTier,
    });
    setVideoUrl(res.data.videoUrl);
    setThumbnailUrl(res.data.thumbnailUrl);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={script}
          onChange={(e) => setScript(e.target.value)}
          placeholder="Enter video script"
          rows={5}
          style={{ width: "100%" }}
        />
        <button type="submit">Generate Faceless Video</button>
      </form>

      {videoUrl && (
        <div>
          <h3>Video Preview</h3>
          <video src={videoUrl} controls width="600" />
          <h4>Thumbnail</h4>
          <img src={thumbnailUrl} alt="AI Thumbnail" width="300" />
        </div>
      )}
    </div>
  );
}
