import React from 'react';

const ClipCard = ({ clip }) => (
    <div className="clip-card">
        <h4>{clip.name}</h4>
        <p>Duration: {clip.duration}s</p>
        {clip.scenes && <p>Scenes: {clip.scenes}</p>}
    </div>
);

export default ClipCard;
