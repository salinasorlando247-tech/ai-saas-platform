import React from 'react';
import { useVideoStore } from '../../store/videoStore';

const VRAROverlay = () => {
    const { videoData } = useVideoStore();

    return (
        <div className='vr-ar-overlay'>
            <h3>VR/AR Overlay Preview</h3>
            {videoData.vrOverlay ? <video src={videoData.vrOverlay} controls /> : <p>No VR/AR overlay applied yet.</p>}
        </div>
    );
};

export default VRAROverlay;
