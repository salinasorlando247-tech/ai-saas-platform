export const predictAudience = (videoData) => {
    return {
        age: Math.floor(Math.random() * 50) + 18,
        gender: Math.random() > 0.5 ? 'male' : 'female',
        location: 'Global'
    };
};
