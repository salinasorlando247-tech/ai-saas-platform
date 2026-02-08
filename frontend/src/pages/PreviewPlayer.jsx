import React from "react";
import { useParams } from "react-router-dom";

const PreviewPlayer = () => {
  const { videoId } = useParams();

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Preview Video #{videoId}</h2>
      <video
        src={`/videos/${videoId}`} // assumes backend serves video URLs
        controls
        className="w-full rounded shadow"
      />
    </div>
  );
};

export default PreviewPlayer;
