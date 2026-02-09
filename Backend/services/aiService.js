export const createAIClip = async (clip) => {
    return { ...clip, url: `https://ai-video.fake/clip-${Date.now()}.mp4` };
};

export const generateAvatar = async (videoData) => {
    return `https://ai-avatar.fake/avatar-${Date.now()}.png`;
};

export const applyVRAROverlay = async (clips) => {
    return `https://vr-ar.fake/overlay-${Date.now()}.mp4`;
};
