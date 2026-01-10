import mongoose, { Schema } from "mongoose";

const tourSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true, // e.g., "Chaos in Cambodia 2026"
    },
    description: {
      type: String,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    budgetLimit: {
      type: Number,
      required: true, // To help the user stay budget-friendly
      default: 0,
    },
    status: {
      type: String,
      enum: ["Planned", "Ongoing", "Completed"],
      default: "Planned",
    },
    locations: [
      {
        name: String,
        coordinates: {
            lat: Number,
            lng: Number
        }
      },
    ],
    coverImage: {
        type: String // Cloudinary URL specific to this trip
    },
    // --- Visibility & Draft Logic ---
    isPublic: {
        type: Boolean,
        default: false, // Default to Private. True = Visible to community.
        index: true, // Important for querying "Public Tours" efficiently
    },
    isDraft: {
        type: Boolean,
        default: true, // Starts as a Draft. False = Published.
    }
  },
  { timestamps: true }
);

export const Tour = mongoose.model("Tour", tourSchema);