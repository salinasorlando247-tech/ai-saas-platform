import React from 'react';
import { useVideoStore } from '../../store/videoStore';

const AIAvatar = () => {
    const { videoData } = useVideoStore();

    return (
        <div className='ai-avatar'>
            <h3>AI Avatar Preview</h3>
            {videoData.avatar ? <img src={videoData.avatar} alt='AI Avatar' /> : <p>No avatar generated yet.</p>}
        </div>
    );
};

export default AIAvatar;
