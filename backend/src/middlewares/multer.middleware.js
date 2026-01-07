import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinary } from "../utils/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "roam-riot-users", // Folder in your Cloudinary console
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    // transform_parameters: { width: 500, height: 500, crop: 'limit' }, // Optional: Resize on upload
  },
});

export const upload = multer({ storage });