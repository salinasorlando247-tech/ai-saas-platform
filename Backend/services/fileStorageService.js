import fs from "fs";
import path from "path";

// ---------- AWS S3 ----------
import AWS from "aws-sdk";

// ---------- Google Cloud Storage ----------
import { Storage } from "@google-cloud/storage";

// ---------- Azure Blob Storage ----------
import { BlobServiceClient } from "@azure/storage-blob";

// ---------- ENV ----------
const {
  S3_BUCKET_NAME,
  S3_REGION,
  S3_ACCESS_KEY,
  S3_SECRET_KEY,
  GCP_BUCKET_NAME,
  GCP_SERVICE_ACCOUNT_JSON,
  AZURE_STORAGE_ACCOUNT,
  AZURE_STORAGE_KEY,
  AZURE_CONTAINER,
  UPLOAD_DIR,
} = process.env;

// -------------------------
// AWS S3 Client
// -------------------------
let s3;
if (S3_BUCKET_NAME) {
  s3 = new AWS.S3({
    region: S3_REGION,
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_KEY,
  });
}

// -------------------------
// GCP Client
// -------------------------
let gcpStorage;
if (GCP_BUCKET_NAME && GCP_SERVICE_ACCOUNT_JSON) {
  gcpStorage = new Storage({
    keyFilename: GCP_SERVICE_ACCOUNT_JSON,
  });
}

// -------------------------
// Azure Client
// -------------------------
let azureClient;
if (AZURE_STORAGE_ACCOUNT && AZURE_STORAGE_KEY) {
  const connStr = `DefaultEndpointsProtocol=https;AccountName=${AZURE_STORAGE_ACCOUNT};AccountKey=${AZURE_STORAGE_KEY};EndpointSuffix=core.windows.net`;
  azureClient = BlobServiceClient.fromConnectionString(connStr);
}

// -------------------------
// Upload file function
// -------------------------
export const uploadFile = async (filePath, destName) => {
  const fileBuffer = fs.readFileSync(filePath);

  // ---------- AWS S3 ----------
  if (s3) {
    const params = {
      Bucket: S3_BUCKET_NAME,
      Key: destName,
      Body: fileBuffer,
      ACL: "public-read",
    };
    const result = await s3.upload(params).promise();
    return result.Location;
  }

  // ---------- GCP ----------
  if (gcpStorage) {
    const bucket = gcpStorage.bucket(GCP_BUCKET_NAME);
    const file = bucket.file(destName);
    await file.save(fileBuffer, {
      resumable: false,
      contentType: "auto",
      public: true,
    });
    return `https://storage.googleapis.com/${GCP_BUCKET_NAME}/${destName}`;
  }

  // ---------- Azure ----------
  if (azureClient) {
    const containerClient = azureClient.getContainerClient(AZURE_CONTAINER);
    const blockBlobClient = containerClient.getBlockBlobClient(destName);
    await blockBlobClient.uploadData(fileBuffer, {
      blobHTTPHeaders: { blobContentType: "application/octet-stream" },
    });
    return `https://${AZURE_STORAGE_ACCOUNT}.blob.core.windows.net/${AZURE_CONTAINER}/${destName}`;
  }

  // ---------- Local fallback ----------
  const localDir = path.resolve(UPLOAD_DIR || "uploads");
  if (!fs.existsSync(localDir)) fs.mkdirSync(localDir, { recursive: true });

  const destPath = path.join(localDir, destName);
  fs.writeFileSync(destPath, fileBuffer);
  return `/uploads/${destName}`;
};
