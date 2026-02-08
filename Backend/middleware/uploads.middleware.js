import AWS from "aws-sdk";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

// Configure S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION,
});

const storage = multer.memoryStorage();
export const upload = multer({ storage });

// Middleware for uploading to cloud
export const uploadToCloud = async (req, res, next) => {
  try {
    const userTier = req.user.tier; // Free, Pro, Growth, Elite
    const file = req.file;
    const key = `${uuidv4()}-${file.originalname}`;

    let bufferToUpload = file.buffer;

    // Apply watermark for Free tier
    if (userTier === "Free") {
      bufferToUpload = await addWatermark(file.buffer);
    }

    await s3.upload({
      Bucket: process.env.AWS_BUCKET,
      Key: key,
      Body: bufferToUpload,
      ContentType: file.mimetype,
    }).promise();

    req.file.cloudKey = key;
    next();
  } catch (err) {
    res.status(500).json({ error: "Upload failed", details: err });
  }
};

// Dummy watermark function (replace with your image/video processing logic)
async function addWatermark(buffer) {
  // Add watermark logic here
  return buffer; // For now, just return original
}
