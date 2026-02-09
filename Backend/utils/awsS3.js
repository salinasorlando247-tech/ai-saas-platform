const AWS = require("aws-sdk");

// AWS configuration using env variables
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Upload function
async function uploadToS3(fileBuffer, fileName, folder = "videos") {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${folder}/${fileName}`,
    Body: fileBuffer,
    ACL: "public-read",
  };

  try {
    const data = await s3.upload(params).promise();
    return data.Location; // returns S3 URL
  } catch (err) {
    console.error("S3 upload error:", err);
    throw err;
  }
}

module.exports = { s3, uploadToS3 };
