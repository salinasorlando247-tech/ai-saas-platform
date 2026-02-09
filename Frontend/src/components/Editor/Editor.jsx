import React, { useState } from 'react';
import { useVideoStore } from '../../store/videoStore';
import { createVideo } from '../../services/apiService';
import Loader from '../Loaders/Loader';

const Editor = () => {
    const { videoData, setVideoData } = useVideoStore();
    const [loading, setLoading] = useState(false);

    const handleCreateVideo = async () => {
        setLoading(true);
        try {
            const result = await createVideo(videoData);
            setVideoData(result);
            alert('Video created successfully!');
        } catch (e) {
            console.error(e);
            alert('Error creating video.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='editor'>
            <h2>Editor</h2>
            <Loader loading={loading} />
            <button onClick={handleCreateVideo} disabled={loading}>
                {loading ? 'Creating...' : 'Create Video'}
            </button>
        </div>
    );
};

export default Editor;
