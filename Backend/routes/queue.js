import express from "express";
const router = express.Router();
let queue = [
  { id: 1, title: "Sample Video 1", filePath: "./videos/sample1.mp4", status: "pending" },
  { id: 2, title: "Sample Video 2", filePath: "./videos/sample2.mp4", status: "pending" }
];

router.get("/", (req, res) => res.json(queue));
router.post("/approve/:id", (req, res) => {
  const item = queue.find(v => v.id == req.params.id);
  if (item) item.status = "approved";
  res.json({ status: "approved" });
});
router.post("/recreate/:id", (req, res) => {
  const item = queue.find(v => v.id == req.params.id);
  if (item) {
    const newFile = item.filePath.replace(".mp4", "-improved.mp4");
    res.json({ status: "recreated", newFile });
  }
});
export default router;
