function getPlatformStrategy(industry, platform) {
    // Example logic, can expand per industry later
    return {
        bestPostTimes: ["07:00", "12:00", "19:00"],
        tone: "direct, slightly confrontational, educational",
        videoStyle: "short, attention-grabbing, educational",
        hookStyle: "pattern interrupt",
        hashtagDensity: "medium",
        CTAStyle: "save + follow + share"
    };
}

module.exports = { getPlatformStrategy };
