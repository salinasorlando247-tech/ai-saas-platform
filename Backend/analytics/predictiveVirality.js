import { analyzePlatformTrends } from './analyticsHelper.js';

export const predictViralityScore = async (videoData, platforms) => {
    const baseScore = videoData.aiScore || 0;

    const platformScores = await Promise.all(
        platforms.map(async (p) => {
            const trend = await analyzePlatformTrends(p, videoData);
            return trend.trendingScore;
        })
    );

    const totalScore = baseScore + platformScores.reduce((a,b)=>a+b,0)/platforms.length;
    return totalScore;
};
