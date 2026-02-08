import AWS from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION,
});

export const uploadToS3 = async (fileBuffer, fileName, mimeType) => {
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: fileName,
    Body: fileBuffer,
    ContentType: mimeType,
  };
  return s3.upload(params).promise();
};
