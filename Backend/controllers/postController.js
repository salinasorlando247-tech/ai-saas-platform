export const getPlatforms = (req, res) => {
    const platforms = ['youtube','tiktok','instagram','facebook','linkedin','twitter','snapchat','reddit','vimeo','twitch','dailymotion','vk','bilibili','triller','likee','kwai','rizzle','mysocial'];
    res.json(platforms);
};
