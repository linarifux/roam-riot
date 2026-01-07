import { v2 as cloudinary } from "cloudinary";
import {configDotenv} from 'dotenv'
configDotenv()

// 1. Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Helper to Delete Files
const deleteFromCloudinary = async (publicId, resourceType = "image") => {
  try {
    if (!publicId) return null;

    // Destroy the file on Cloudinary
    // Note: resourceType should be 'image' or 'video'
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });

    return result;
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    return null;
  }
};

export { cloudinary, deleteFromCloudinary };