import express from 'express';
import bodyParser from 'body-parser';
import aiWorker from './aiworker.js';

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('AI SaaS Backend is running!');
});

app.post('/api/ai', async (req, res) => {
  const { prompt } = req.body;
  try {
    const result = await aiWorker(prompt);
    res.json({ result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'AI Worker error' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
