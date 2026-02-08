import { storeMemory, getMemory } from "../services/memoryService.js";

export const writeMemory = (req, res) => {
  const { type, payload } = req.body;

  storeMemory(type, payload);

  res.json({ saved: true });
};

export const readMemory = (req, res) => {
  const { type } = req.params;

  const data = getMemory(type);

  res.json(data);
};
