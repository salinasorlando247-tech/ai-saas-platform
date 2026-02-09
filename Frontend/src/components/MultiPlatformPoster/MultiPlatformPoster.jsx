import React, { useState } from 'react';
import { postToPlatforms } from '../../services/apiService';

const MultiPlatformPoster = () => {
    const [posting, setPosting] = useState(false);

    const handlePost = async () => {
        setPosting(true);
        try {
            await postToPlatforms();
            alert('Video posted to all platforms!');
        } catch (e) {
            console.error(e);
            alert('Error posting video.');
        } finally {
            setPosting(false);
        }
    };

    return (
        <div className='multi-platform-poster'>
            <h2>Post to Platforms</h2>
            <button onClick={handlePost} disabled={posting}>
                {posting ? 'Posting...' : 'Post to 20+ Platforms'}
            </button>
        </div>
    );
};

export default MultiPlatformPoster;
