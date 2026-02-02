const Queue = require("bull");
const redis = require("../config/redis");

const videoQueue = new Queue("video-jobs", {
  redis: process.env.REDIS_URL
});

module.exports = videoQueue;
