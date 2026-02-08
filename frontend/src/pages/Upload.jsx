import { useState } from "react";
import api from "../api/api";

export default function Upload() {

  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const upload = async () => {

    const form = new FormData();
    form.append("video", file);

    await api.post("/videos/upload", form, {
      onUploadProgress: (e) => {
        const percent = Math.round((e.loaded * 100) / e.total);
        setProgress(percent);
      }
    });

    alert("Upload complete");
  };

  return (
    <div className="p-6">

      <h1 className="text-xl mb-4">Upload Video</h1>

      <input type="file" onChange={e => setFile(e.target.files[0])} />

      <button onClick={upload}
        className="bg-green-600 text-white p-2 ml-2">
        Upload
      </button>

      {progress > 0 && (
        <div className="mt-2">Progress: {progress}%</div>
      )}

    </div>
  );
}
