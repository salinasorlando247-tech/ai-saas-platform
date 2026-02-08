const viralScore = (req, res) => {
  try {
    // Simple placeholder scoring logic
    const { likes = 0, shares = 0, comments = 0 } = req.query;

    const score =
      Number(likes) * 2 +
      Number(shares) * 3 +
      Number(comments) * 1.5;

    res.json({
      success: true,
      viralScore: score
    });

  } catch (error) {
    console.error("Viral score error:", error);
    res.status(500).json({ error: "Viral score calculation failed" });
  }
};

export default viralScore;
