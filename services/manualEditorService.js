import { manualEditEngine } from '../utils/manualEditEngine.js';

export const manualEditorService = {
  editVideo: async ({ videoUrl, uploadFile, editInstructions, industry, userId }) => {
    // Fully manual editing with AI-assisted suggestions
    return await manualEditEngine({ videoUrl, uploadFile, editInstructions, industry, userId });
  }
};
