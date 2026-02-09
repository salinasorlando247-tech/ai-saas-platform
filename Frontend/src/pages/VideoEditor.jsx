import React, { useState, useEffect } from 'react';
import { getToken } from '..src/utils/auth.js';

const VideoEditor = () => {
  const [clips, setClips] = useState([]);
  const [template, setTemplate] = useState('default');
  const [proSettings, setProSettings] = useState({ colorCorrection:true, transitions:true, speedRamp:true });

  const addClip = (clip) => setClips([...clips, clip]);

  const handleGenerateVideo = async () => {
    const res = await fetch('/api/video/create', {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({ clips, template, proSettings, autoPost:true })
    });
    const data = await res.json();
    alert(`Video created! ID: ${data.id}`);
  };

  return (
    <div className="video-editor-page">
      <h1>ForgeAI Video Editor</h1>
      <div className="clips-list">
        {clips.map((c,i)=><div key={i}>{c.name || `Clip ${i+1}`}</div>)}
      </div>
      <button onClick={()=>addClip({ name:`Clip ${clips.length+1}`, duration:5 })}>Add Clip</button>
      <select value={template} onChange={e=>setTemplate(e.target.value)}>
        <option value="default">Default</option>
        <option value="faceless">Faceless</option>
        <option value="vr_overlay">VR/AR Overlay</option>
      </select>
      <button onClick={handleGenerateVideo}>Generate Video</button>
    </div>
  );
};

export default VideoEditor;
