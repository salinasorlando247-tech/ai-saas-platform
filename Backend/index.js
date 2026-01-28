import express from 'express';
import aiWorker from './aiworker.js'; // make sure file name matches exactly

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.post('/api/ai', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const result = await aiWorker(prompt); // your aiWorker function
    res.json({ result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'AI request failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
