import multer from "multer";

export const upload = multer({
  limits:{fileSize:500*1024*1024},
  fileFilter(req,file,cb){
    if(!file.mimetype.startsWith("video")){
      cb(new Error("Invalid file"));
    }
    cb(null,true);
  }
});
