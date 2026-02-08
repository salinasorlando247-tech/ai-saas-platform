import { aiEditingEngine } from '../utils/aiEditingEngine.js';

export const aiEditingService = {
  /**
   * Manual editing
   */
  manualEdit: async ({ videoUrl, uploadFile, editInstructions, userId }) => {
    const inputFile = uploadFile || videoUrl;
    const output = await aiEditingEngine.editVideo({ inputFile, editInstructions, outputDir: `videos/${userId}` });
    return { editedVideoUrl: output };
  },

  /**
   * Auto AI editing
   */
  autoEdit: async ({ videoFile, industry, userId }) => {
    const output = await aiEditingEngine.autoEdit({ videoFile, industry, userId });
    return { editedVideoUrl: output };
  }
};
