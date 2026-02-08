import { synthesizeVoice } from "./voiceSynthesis.service.js";

export async function previewVoice(config) {
  return synthesizeVoice({
    ...config,
    preview: true
  });
}
