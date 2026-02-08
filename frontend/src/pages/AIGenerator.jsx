import { useState } from 'react';
import api from '../../api/api';
import VideoPreview from './VideoPreview';

export default function AIGenerator() {
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateAI = async () => {
    setLoading(true);
    const res = await api.post('/ai-video/generate', { prompt: 'example script' });
    setVideoUrl(res.data.path);
    setLoading(false);
  };

  return (
    <div>
      <button onClick={generateAI} className="btn">Generate AI Video</button>
      {loading && <p>Rendering...</p>}
      {videoUrl && <VideoPreview src={videoUrl} />}
    </div>
  );
}
