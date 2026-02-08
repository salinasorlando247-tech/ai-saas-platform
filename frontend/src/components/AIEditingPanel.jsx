import React, { useState } from 'react';
import axios from 'axios';

const AIEditingPanel = ({ userId }) => {
  const [uploadFile, setUploadFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [editInstructions, setEditInstructions] = useState('');
  const [industry, setIndustry] = useState('General');
  const [resultVideo, setResultVideo] = useState(null);

  const handleManualEdit = async () => {
    const formData = new FormData();
    if (uploadFile) formData.append('uploadFile', uploadFile);
    formData.append('videoUrl', videoUrl);
    formData.append('editInstructions', editInstructions);
    formData.append('industry', industry);

    const res = await axios.post('/api/aiVideo/manual-edit', formData);
    setResultVideo(res.data.editedVideoUrl);
  };

  const handleAutoEdit = async () => {
    const res = await axios.post('/api/aiVideo/auto-edit', { videoFile: uploadFile || videoUrl, industry, userId });
    setResultVideo(res.data.editedVideoUrl);
  };

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold mb-2">AI Editing Engine</h2>
      <input type="text" placeholder="Paste URL" value={videoUrl} onChange={e => setVideoUrl(e.target.value)} className="border p-2 w-full mb-2"/>
      <input type="file" onChange={e => setUploadFile(e.target.files[0])} className="mb-2"/>
      <textarea placeholder="Edit instructions (JSON)" value={editInstructions} onChange={e => setEditInstructions(e.target.value)} className="border p-2 w-full mb-2"/>
      <select value={industry} onChange={e => setIndustry(e.target.value)} className="border p-2 mb-2">
        <option>General</option>
        <option>Fitness</option>
        <option>Education</option>
        <option>E-commerce</option>
        <option>Gaming</option>
        <option>Music</option>
      </select>
      <button onClick={handleManualEdit} className="bg-purple-600 text-white px-4 py-2 rounded mr-2">Manual Edit</button>
      <button onClick={handleAutoEdit} className="bg-green-600 text-white px-4 py-2 rounded">Auto Edit</button>

      {resultVideo && <video src={resultVideo} controls className="mt-4 w-full"/>}
    </div>
  );
};

export default AIEditingPanel;
