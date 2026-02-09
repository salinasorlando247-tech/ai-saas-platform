export const log = (message, level = 'info') => {
    const time = new Date().toISOString();
    console.log(`[${level.toUpperCase()}] [${time}] ${message}`);
};
