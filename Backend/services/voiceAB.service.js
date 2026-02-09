export function generateVoiceVariants(voiceConfig) {
  return [
    { ...voiceConfig, emphasis: "hook" },
    { ...voiceConfig, emphasis: "story" }
  ];
}
