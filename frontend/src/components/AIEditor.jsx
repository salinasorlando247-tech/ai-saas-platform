import React, { useState } from "react";
import axios from "axios";

export default function AIEditor() {
  const [file, setFile] = useState(null);
  const [instructions, setInstructions] = useState("");

  const handleUpload = async () => {
    const form = new FormData();
    form.append("media", file);
    form.append("instructions", instructions);
    const res = await axios.post("http://localhost:5000/api/ai/edit", form, { responseType: "blob" });
    const url = URL.createObjectURL(res.data);
    const a = document.createElement("a");
    a.href = url;
    a.download = "edited-video.mp4";
    a.click();
  };

  return (
    <div>
      <h2>AI Editor</h2>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <input type="text" placeholder="Instructions" value={instructions} onChange={e => setInstructions(e.target.value)} />
      <button onClick={handleUpload}>Edit & Download</button>
    </div>
  );
}
