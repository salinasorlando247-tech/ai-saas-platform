import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Storage setup
const storage = multer.diskStorage({
  destination: (req,file,cb) => cb(null,'uploads/'),
  filename: (req,file,cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage, limits: { fileSize: 500*1024*1024 } }); // 500MB max

router.post('/video', upload.single('video'), (req,res) => {
  res.json({ message: 'Uploaded', path: req.file.path });
});

export default router;
