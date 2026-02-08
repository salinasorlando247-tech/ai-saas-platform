import multer from "multer";
import config from "../config/config.js";

export const upload = multer({
  limits: { fileSize: config.upload.maxSizeMB * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    config.upload.allowedTypes.includes(file.mimetype)
      ? cb(null, true)
      : cb(new Error("Invalid file type"));
  },
});
