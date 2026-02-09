import express from "express";
import fs from "fs";
import path from "path";
import FormData from "form-data";
import axios from "axios";

export default (upload) => {
  const router = express.Router();

  router.post("/edit", upload.single("media"), async (req, res) => {
    try {
      const filePath = req.file.path;
      const instructions = req.body.instructions;

      // AI video/image edit simulation
      const form = new FormData();
      form.append("model", "gpt-video-editor");
      form.append("file", fs.createReadStream(filePath));
      form.append("instructions", instructions);

      const aiRes = await axios.post(
        "https://api.openai.com/v1/video/edits",
        form,
        {
          headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, ...form.getHeaders() },
          responseType: "arraybuffer"
        }
      );

      const editedPath = `${filePath}-edited.mp4`;
      fs.writeFileSync(editedPath, aiRes.data);
      res.sendFile(path.resolve(editedPath), () => {
        fs.unlinkSync(filePath);
        fs.unlinkSync(editedPath);
      });
    } catch (err) {
      console.error(err.response?.data || err.message);
      res.status(500).json({ error: "AI edit failed" });
    }
  });

  return router;
};
