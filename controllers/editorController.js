import { manualEditorService } from '../../services/manualEditorService.js';
export const editVideo = async (req,res,next) => {
  try { const result = await manualEditorService.edit(req.file, req.user); res.json(result); } 
  catch(e){ next(e); }
};
export const approveVideo = async (req,res,next) => {
  try { const result = await manualEditorService.approve(req.body.videoId, req.user); res.json(result); }
  catch(e){ next(e); }
};
export const regenerateVideo = async (req,res,next) => {
  try { const result = await manualEditorService.regenerate(req.body.videoId, req.user); res.json(result); }
  catch(e){ next(e); }
};
