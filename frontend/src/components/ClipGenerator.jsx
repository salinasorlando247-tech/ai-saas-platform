import React, { useState } from 'react';
import axios from 'axios';

const ClipGenerator = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [clips, setClips] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerateClips = async () => {
    if (!videoFile && !videoUrl) return alert('Upload a video or paste a URL');

    setLoading(true);
    const formData = new FormData();
    if (videoFile) formData.append('uploadFile', videoFile);
    formData.append('videoUrl', videoUrl);

    try {
      const res = await axios.post('/api/aiVideo/generate-clips', formData);
      setClips(res.data.clips);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-2">AI Clip Generator</h2>
      <input type="text" placeholder="Paste video URL" value={videoUrl} onChange={e => setVideoUrl(e.target.value)} className="border p-2 w-full mb-2"/>
      <input type="file" onChange={e => setVideoFile(e.target.files[0])} className="mb-2"/>
      <button onClick={handleGenerateClips} className="bg-purple-600 text-white px-4 py-2 rounded" disabled={loading}>
        {loading ? 'Generating...' : 'Generate Clips'}
      </button>

      {clips.length > 0 && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {clips.map((clip, idx) => (
            <video key={idx} src={clip} controls className="w-full rounded shadow" />
          ))}
        </div>
      )}
    </div>
  );
};

export default ClipGenerator;
