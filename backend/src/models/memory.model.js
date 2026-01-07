import mongoose, { Schema } from "mongoose";

const memorySchema = new Schema(
  {
    tour: {
      type: Schema.Types.ObjectId,
      ref: "Tour",
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId, // Creating a direct link to user for faster queries
      ref: "User",
      required: true,
    },
    type: {
        type: String,
        enum: ["IMAGE", "VIDEO"],
        required: true
    },
    mediaUrl: {
      type: String, // Cloudinary URL
      required: true,
    },
    publicId: {
        type: String, // Cloudinary Public ID for deletion
        required: true
    },
    caption: {
      type: String, 
      // This can be the raw user input or the AI enhanced funny caption
    },
    locationName: {
        type: String
    },
    mood: {
        type: String,
        enum: ["Happy", "Crazy", "Peaceful", "Disaster", "Party"],
        default: "Happy"
    },
    isPostedToSocials: {
        type: Boolean,
        default: false
    }
  },
  { timestamps: true }
);

export const Memory = mongoose.model("Memory", memorySchema);