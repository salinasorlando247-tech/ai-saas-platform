import React, { useState } from "react";
import axios from "axios";

export default function AIEditor() {
  const [file, setFile] = useState(null);
  const [instructions, setInstructions] = useState("");
  const [outputUrl, setOutputUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEdit = async () => {
    if (!file || !instructions) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("media", file);
    formData.append("instructions", instructions);

    try {
      const res = await axios.post("http://localhost:5000/api/ai/edit", formData, {
        responseType: "blob",
      });
      const url = URL.createObjectURL(res.data);
      setOutputUrl(url);
    } catch (err) {
      console.error(err);
      alert("AI editing failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-editor">
      <h2>AI Editor</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <textarea
        placeholder="Describe the edits you want (e.g., turn me into a cyborg)"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
      />
      <button onClick={handleEdit} disabled={loading}>
        {loading ? "Processing..." : "Edit Media"}
      </button>

      {outputUrl && (
        <div className="output-preview">
          {file.type.startsWith("video") ? (
            <video src={outputUrl} controls />
          ) : (
            <img src={outputUrl} alt="Edited preview" />
          )}
        </div>
      )}
    </div>
  );
}
