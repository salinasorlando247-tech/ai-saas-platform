import fs from "fs";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";
import OpenAI from "openai";

ffmpeg.setFfmpegPath(ffmpegPath.path);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Clean audio from background noise and enhance voice clarity
 */
export async function enhanceAudio(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .audioFilter([
        "highpass=f=200",  // Remove low-frequency hums
        "lowpass=f=3000",  // Remove high-frequency hiss
        "afftdn=nf=-25"    // Noise reduction
      ])
      .audioCodec("aac")
      .on("end", () => resolve(outputPath))
      .on("error", reject)
      .save(outputPath);
  });
}

/**
 * Merge background music with voice, keeping voice clear
 */
export async function mergeAudioWithMusic(voicePath, musicPath, outputPath, voiceGain = 1.2, musicGain = 0.6) {
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(voicePath)
      .input(musicPath)
      .complexFilter([
        `[0:a]volume=${voiceGain}[voice];`,
        `[1:a]volume=${musicGain}[music];`,
        `[voice][music]amix=inputs=2:dropout_transition=2[aout]`
      ])
      .outputOptions("-map [aout]")
      .on("end", () => resolve(outputPath))
      .on("error", reject)
      .save(outputPath);
  });
}

/**
 * Extract text script from audio using Whisper
 */
export async function transcribeAudio(audioPath) {
  try {
    const fileStream = fs.createReadStream(audioPath);
    const transcription = await openai.audio.transcriptions.create({
      file: fileStream,
      model: "whisper-1",
    });
    return transcription.text;
  } catch (err) {
    console.warn("⚠️ Transcription failed, returning empty string.", err.message);
    return "";
  }
}
