export default {
  env: process.env.NODE_ENV || "development",

  jwt: {
    secret: process.env.JWT_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessTTL: "15m",
    refreshTTL: "7d",
  },

  redis: {
    url: process.env.REDIS_URL,
  },

  upload: {
    maxSizeMB: 500,
    allowedTypes: ["video/mp4", "video/mov"],
  },

  gpu: {
    provider: "runpod", // aws | runpod | lambda
    concurrency: 2,
  },
};
