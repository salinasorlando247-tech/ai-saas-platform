import fs from "fs";
import path from "path";

const file = path.join("analytics.json");

export const Analytics = {
  record: async (videoId, metric) => {
    let data = {};
    if (fs.existsSync(file)) data = JSON.parse(fs.readFileSync(file));
    if (!data[videoId]) data[videoId] = [];
    data[videoId].push(metric);
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
  },

  getAll: async () => {
    if (!fs.existsSync(file)) return {};
    return JSON.parse(fs.readFileSync(file));
  },

  updateAI: async (videoId, updates) => {
    let data = JSON.parse(fs.readFileSync(file));
    data[videoId] = { ...data[videoId], ...updates };
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
  },
};
