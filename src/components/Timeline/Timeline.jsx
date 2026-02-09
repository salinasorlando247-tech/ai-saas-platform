import React from 'react';
import { useVideoStore } from '../../store/videoStore';

const Timeline = () => {
    const { videoData } = useVideoStore();

    return (
        <div className='timeline'>
            <h3>Timeline</h3>
            {videoData.clips && videoData.clips.map((clip, index) => (
                <div key={index}>
                    {clip.name} ({clip.duration}s)
                </div>
            ))}
        </div>
    );
};

export default Timeline;
