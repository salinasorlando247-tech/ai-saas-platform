import React, { useState } from 'react';

const platforms = [
  'YouTube','TikTok','Instagram','Facebook','LinkedIn','Twitter',
  'Snapchat','Reddit','Vimeo','Twitch','Dailymotion','VK',
  'Bilibili','Triller','Likee','Kwai','Rizzle','MySocial'
];

const PostScheduler = ({ onSchedule }) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  const togglePlatform = (p) => {
    setSelectedPlatforms(prev => prev.includes(p) ? prev.filter(x=>x!==p) : [...prev,p]);
  };

  const handleSchedule = () => onSchedule(selectedPlatforms);

  return (
    <div className="post-scheduler">
      <h3>Schedule Posts</h3>
      <div className="platforms">
        {platforms.map(p => (
          <label key={p}>
            <input type="checkbox" checked={selectedPlatforms.includes(p)} onChange={()=>togglePlatform(p)} />
            {p}
          </label>
        ))}
      </div>
      <button onClick={handleSchedule}>Schedule</button>
    </div>
  );
};

export default PostScheduler;
