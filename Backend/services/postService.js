import { redis } from '../config/redis.js';

export const schedulePosts = async (video) => {
    const platforms = [
        'youtube','tiktok','instagram','facebook','linkedin','twitter',
        'snapchat','reddit','vimeo','twitch','dailymotion','vk',
        'bilibili','triller','likee','kwai','rizzle','mysocial'
    ];

    for(const platform of platforms){
        const postJob = {
            videoId: video.id,
            platform,
            caption: generatePlatformCaption(video, platform),
            aspectRatio: getPlatformAspectRatio(platform),
            watermark: video.watermark || null,
            scheduledAt: new Date(Date.now() + 1000*60*5) // schedule 5 mins later
        };
        await redis.lpush('postQueue', JSON.stringify(postJob));
    }

    return true;
};

const generatePlatformCaption = (video, platform) => {
    // Example: customize captions per platform
    return video.captions?.map(c => c.text).join(' ') + ` #ForgeAI #${platform}`;
};

const getPlatformAspectRatio = (platform) => {
    switch(platform){
        case 'tiktok': return '9:16';
        case 'instagram': return '1:1';
        case 'youtube': return '16:9';
        default: return '16:9';
    }
};
