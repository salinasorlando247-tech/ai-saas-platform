import React, { useState } from 'react';
import axios from 'axios';

const ManualEditor = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [uploadFile, setUploadFile] = useState(null);
  const [editInstructions, setEditInstructions] = useState('');
  const [industry, setIndustry] = useState('General');

  const handleManualEdit = async () => {
    const formData = new FormData();
    formData.append('videoUrl', videoUrl);
    if (uploadFile) formData.append('uploadFile', uploadFile);
    formData.append('editInstructions', editInstructions);
    formData.append('industry', industry);

    const response = await axios.post('/api/aiVideo/manual-edit', formData);
    console.log(response.data); // edited video returned
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-2">Manual Editing</h2>
      <input type="text" placeholder="Paste URL" value={videoUrl} onChange={e => setVideoUrl(e.target.value)} className="border p-2 w-full mb-2" />
      <input type="file" onChange={e => setUploadFile(e.target.files[0])} className="mb-2" />
      <textarea placeholder="Editing Instructions" value={editInstructions} onChange={e => setEditInstructions(e.target.value)} className="border p-2 w-full mb-2"></textarea>
      <select value={industry} onChange={e => setIndustry(e.target.value)} className="border p-2 mb-2">
        <option>General</option>
        <option>Fitness</option>
        <option>Education</option>
        <option>E-commerce</option>
        <option>Gaming</option>
        <option>Music</option>
      </select>
      <button onClick={handleManualEdit} className="bg-purple-600 text-white px-4 py-2 rounded">Submit Edit</button>
    </div>
  );
};

export default ManualEditor;
