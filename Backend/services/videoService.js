import { createAIClip, applyVROverlay, generateFacelessAvatar, generateCaptions } from './aiEditingService.js';
import { insertVideo } from '../models/videoModel.js';
import { logVideoEvent } from '../analytics/eventLogger.js';
import { schedulePosts } from './postService.js';

export const generateVideo = async (videoData) => {
    // 1. Process each clip with AI
    const processedClips = await Promise.all(videoData.clips.map(async clip => await createAIClip(clip)));

    // 2. Generate faceless avatar if template requires
    let avatar = null;
    if(videoData.template === 'faceless') avatar = await generateFacelessAvatar(videoData);

    // 3. Generate predictive captions
    const captions = await generateCaptions(videoData);

    // 4. Apply VR/AR overlays if template requires
    let vrOverlay = null;
    if(videoData.template === 'vr_overlay') vrOverlay = await applyVROverlay(processedClips);

    // 5. Prepare final video object
    const finalVideo = {
        ...videoData,
        clips: processedClips,
        avatar,
        captions,
        vrOverlay
    };

    // 6. Insert video to DB
    const savedVideo = await insertVideo(finalVideo);

    // 7. Log analytics & virality
    await logVideoEvent(savedVideo);

    // 8. Schedule posts if auto-post enabled
    if(videoData.autoPost) await schedulePosts(savedVideo);

    return savedVideo;
};
