import { generateVideo } from '../services/videoService.js';
import { schedulePosts } from '../services/postService.js';
import { logVideoEvent } from '../analytics/eventLogger.js';

export const createVideo = async (req, res) => {
    try {
        const video = await generateVideo(req.body);
        await logVideoEvent(video);
        res.json(video);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Video creation failed' });
    }
};

export const postVideos = async (req, res) => {
    try {
        await schedulePosts();
        res.json({ success: true, message: 'Videos scheduled' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Posting failed' });
    }
};
