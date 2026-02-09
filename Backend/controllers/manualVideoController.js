import { getVideoById, updateVideo } from "../models/videoModel.js";
import { applyManualEdits } from "../services/manualEditService.js"; // Handles all manual edits

// Manual edits (cut, trim, overlay, effects, speed, color)
export const editVideoManually = async (req, res) => {
  try {
    const { video_id, edits } = req.body; // edits = array of actions with timestamps, effects, overlays
    const video = await getVideoById(video_id);
    if (!video) return res.status(404).json({ success: false, error: "Video not found" });

    // Apply edits
    const editedFile = await applyManualEdits(video.file, edits);

    // Update video record
    await updateVideo(video_id, { file: editedFile, approved: false });
    res.json({ success: true, videoId: video_id, file: editedFile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};
