import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

export const renderVideo = async ({ script, clientId, outputFile }) => {
  return new Promise((resolve, reject) => {
    const outputPath = path.resolve(`./renders/${clientId}-${Date.now()}.mp4`);
    const pythonProcess = spawn('python3', ['./ai_model/render_video.py', script, outputPath]);

    pythonProcess.stdout.on('data', (data) => console.log(`GPU Render: ${data}`));
    pythonProcess.stderr.on('data', (data) => console.error(`GPU Error: ${data}`));

    pythonProcess.on('close', (code) => {
      if (code === 0 && fs.existsSync(outputPath)) resolve({ url: outputPath });
      else reject(new Error('Rendering failed'));
    });
  });
};
