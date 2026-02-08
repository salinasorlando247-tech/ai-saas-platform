export function sanitizeForStorage(output) {
  delete output.rawVoiceModel;
  delete output.renderGraph;
  delete output.internalPrompts;

  return output;
}
