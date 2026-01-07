import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    // We can make the filename unique here if we want, 
    // but Cloudinary handles uniqueness, so keeping original name is fine for temp.
    cb(null, file.originalname);
  },
});

export const upload = multer({ 
    storage, 
});