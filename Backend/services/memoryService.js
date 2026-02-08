import fs from "fs";

const memoryFile = "./data/aiMemory.json";

const loadMemory = () => {
  const data = fs.readFileSync(memoryFile);
  return JSON.parse(data);
};

const saveMemory = (memory) => {
  fs.writeFileSync(memoryFile, JSON.stringify(memory, null, 2));
};

export const storeMemory = (type, payload) => {
  const memory = loadMemory();

  memory[type].push({
    ...payload,
    timestamp: new Date()
  });

  saveMemory(memory);
};

export const getMemory = (type) => {
  const memory = loadMemory();
  return memory[type];
};
