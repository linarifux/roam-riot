import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    
    // Upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", // Detects if it's image or video automatically
    });
    
    // File has been uploaded successfully
    // console.log("File uploaded successfully on Cloudinary", response.url);
    
    // Remove the locally saved temporary file
    fs.unlinkSync(localFilePath); 
    
    return response;

  } catch (error) {
    // Remove the local file if upload failed to prevent clutter
    fs.unlinkSync(localFilePath); 
    return null;
  }
};

const deleteFromCloudinary = async (publicId) => {
    try {
        if(!publicId) return null;
        await cloudinary.uploader.destroy(publicId);
        return true;
    } catch (error) {
        console.error("Error deleting from Cloudinary", error);
        return false;
    }
}

export { uploadOnCloudinary, deleteFromCloudinary };