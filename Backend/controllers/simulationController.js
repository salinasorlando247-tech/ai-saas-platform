import { simulateAction } from "../services/simulationService.js";

export const runSimulation = async (req, res) => {
  try {

    const action = req.body;

    const result = await simulateAction(action);

    res.json({
      simulated: true,
      result
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
