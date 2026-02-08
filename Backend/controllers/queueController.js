export const getQueueStatus = async (req, res) => {
  try {
    // Temporary mock data
    const queue = [
      { id: 1, type: "AI Video", status: "processing" },
      { id: 2, type: "Upload", status: "completed" },
    ];
    res.json(queue);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch queue status" });
  }
};
