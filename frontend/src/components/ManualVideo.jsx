import React, { useState } from "react";

function ManualVideo() {
  const [file, setFile] = useState(null);
  const [instructions, setInstructions] = useState("");

  const handleUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const processVideo = () => {
    if (!file) return alert("Import a video first");

    alert(
      `Video "${file.name}" queued for AI processing with instructions:\n\n${instructions}`
    );
  };

  return (
    <div>

      <input
        type="file"
        className="futuristic-input"
        accept="video/*"
        onChange={handleUpload}
      />

      <textarea
        className="futuristic-input"
        placeholder="Tell AI how to edit the video (captions, cuts, zooms, music...)"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
      />

      <button
        className="futuristic-btn"
        onClick={processVideo}
      >
        Process Video
      </button>

      {file && (
        <p style={{ marginTop: "8px" }}>
          Imported: {file.name}
        </p>
      )}

    </div>
  );
}

export default ManualVideo;
