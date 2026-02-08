import { s3 } from '../config/cloud.js';
import fs from 'fs';

export const uploadFile = async (filePath, bucket, key) => {
  const fileContent = fs.readFileSync(filePath);
  return s3
    .upload({
      Bucket: bucket,
      Key: key,
      Body: fileContent,
    })
    .promise();
};
