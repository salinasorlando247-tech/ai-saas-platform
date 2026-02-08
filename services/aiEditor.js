import { exec } from "child_process";
import path from "path";

export async function generateAIEdit(inputPath, instructions) {
  const outputPath = path.join("edited", path.basename(inputPath));

  await new Promise((resolve, reject) => {
    exec(`python3 ai_edit.py "${inputPath}" "${instructions}" "${outputPath}"`, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

  return outputPath;
}
