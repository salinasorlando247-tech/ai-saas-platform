// backend/services/aiEditVideo.js
const { runAiModel } = require("../utils/aiModelRunner");
const { addCaptions, addTags, addMetadata } = require("../utils/metadataTools");
const { applyAvatar, applyVoice } = require("../utils/avatarTools");

class AiEditVideo {
  // Auto-generate base video
  async generate(videoData, userId) {
    const generated = await runAiModel("generateVideo", videoData);
    return generated.filePath;
  }

  // Auto-edit for all platforms
  async edit(videoData, userId) {
    const edited = await runAiModel("editVideo", videoData);

    // Apply avatar if requested
    if (videoData.avatar) await applyAvatar(edited.filePath, videoData.avatarSettings);

    // Apply voiceover if requested
    if (videoData.voice) await applyVoice(edited.filePath, videoData.voiceSettings);

    return edited;
  }

  async manualEdit(videoSource, userId, options) {
    const manualEdited = await runAiModel("manualEdit", {
      videoSource,
      options
    });
    return manualEdited;
  }

  async addCaptionsTags(videoData) {
    const captions = await addCaptions(videoData.text || "");
    const tags = await addTags(videoData.tags || []);
    return { captions, tags };
  }

  async predictPerformance(videoData) {
    const prediction = await runAiModel("predictEngagement", videoData);
    return prediction;
  }
}

const aiEditVideo = new AiEditVideo();
module.exports = { aiEditVideo };
