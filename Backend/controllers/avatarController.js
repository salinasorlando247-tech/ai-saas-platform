import { generateAvatar } from '../services/avatarService.js';

export const generateAvatarController = async (req, res) => {
    try {
        const avatarUrl = await generateAvatar(req.body);
        res.json({ avatarUrl });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Avatar generation failed' });
    }
};
