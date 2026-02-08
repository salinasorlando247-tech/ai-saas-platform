import { useState } from 'react';
import api from '../../api/api';
import VideoPreview from './VideoPreview';
import { toast } from 'react-toastify';

export default function VideoUploader() {
  const [file, setFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);

  const handleUpload = async () => {
    const form = new FormData();
    form.append('video', file);
    const res = await api.post('/manual-editor/upload', form);
    toast.success('Video uploaded!');
    setVideoUrl(res.data.path);
  };

  return (
    <div className="p-4 border rounded">
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload} className="btn">Upload</button>
      {videoUrl && <VideoPreview src={videoUrl} />}
    </div>
  );
}
