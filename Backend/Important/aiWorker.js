import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import S3 from 'aws-sdk/clients/s3';

const s3 = new S3({ region: process.env.AWS_REGION });

export async function renderVideoAI(script, outputName) {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(process.cwd(), 'tmp', `${outputName}.mp4`);

    const worker = spawn('python', ['ai_renderer.py', '--script', script, '--output', outputPath]);
    
    worker.stdout.on('data', data => console.log(`AI Worker: ${data}`));
    worker.stderr.on('data', err => console.error(`AI Worker Error: ${err}`));

    worker.on('close', async code => {
      if (code !== 0) return reject('AI render failed');
      const fileStream = fs.createReadStream(outputPath);
      await s3.upload({ Bucket: process.env.S3_BUCKET, Key: outputName+'.mp4', Body: fileStream }).promise();
      resolve(`s3://${process.env.S3_BUCKET}/${outputName}.mp4`);
    });
  });
}
