import React, { useState } from 'react';
import api from '../../utils/api';

export default function AvatarVideo({ script }) {
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    const res = await api.post('/ai/avatar-video', { script });
    setVideoUrl(res.data.videoUrl);
    setLoading(false);
  };

  return (
    <div className="p-4 border rounded">
      <button onClick={generate} className="bg-blue-600 text-white px-4 py-2 rounded">Generate Avatar Video</button>
      {loading && <p>Generating video...</p>}
      {videoUrl && <video src={videoUrl} controls className="mt-2 w-full rounded shadow" />}
    </div>
  );
}
