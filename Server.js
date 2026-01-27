import express from 'express';
import multer from 'multer';
import ContentManager from './Backend/ContentManager.js';
import cors from 'cors';

const app = express();
const upload = multer({ dest: 'uploads/' });
const manager = new ContentManager();

app.use(cors());
app.use(express.json());

// Generate AI post
app.post('/generate', async (req, res) => {
  const { industry, topic, client } = req.body;
  const post = await manager.createPost(industry, topic, client);
  res.json(post);
});

// Upload raw footage
app.post('/upload', upload.single('video'), async (req, res) => {
  const { client, industry, topic } = req.body;
  const filePath = req.file.path;
  const result = await manager.processUserFootage(filePath, { clientName: client, industry, topic });
  res.json(result);
});

// Get client posts
app.get('/analytics/:client', (req, res) => {
  const { client } = req.params;
  res.json(manager.analytics.getClientPosts(client));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
