import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import aiWorker from './aiworker.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('AI SaaS Backend is running!'));

app.post('/api/ai', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: 'No prompt provided' });

    const result = await aiWorker(prompt);
    res.json({ result });
  } catch (err) {
    console.error('AI request error:', err);
    res.status(500).json({ error: 'AI request failed' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
