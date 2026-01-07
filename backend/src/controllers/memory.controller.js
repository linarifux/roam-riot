import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Memory } from "../models/memory.model.js";
import { Tour } from "../models/tour.model.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";

// 1. Add a Memory (Photo/Video) to a Tour
const addMemory = asyncHandler(async (req, res) => {
    const { tourId } = req.params;
    const { caption, mood, locationName } = req.body;

    // Validate Tour existence and ownership
    const tour = await Tour.findById(tourId);
    if (!tour) {
        throw new ApiError(404, "Tour not found");
    }
    
    if (tour.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You cannot add memories to someone else's tour");
    }

    // Check for file
    const localFilePath = req.file?.path;
    if (!localFilePath) {
        throw new ApiError(400, "Media file (Image/Video) is required");
    }

    // Upload to Cloudinary
    const uploadResponse = await uploadOnCloudinary(localFilePath);

    if (!uploadResponse) {
        throw new ApiError(500, "Failed to upload media");
    }

    // Determine type based on Cloudinary response
    // Cloudinary returns resource_type as 'image' or 'video'
    const mediaType = uploadResponse.resource_type === 'video' ? 'VIDEO' : 'IMAGE';

    const memory = await Memory.create({
        tour: tourId,
        owner: req.user._id,
        type: mediaType,
        mediaUrl: uploadResponse.url,
        publicId: uploadResponse.public_id, // Important for deletion later
        caption: caption || "",
        locationName: locationName || "",
        mood: mood || "Happy"
    });

    return res.status(201).json(
        new ApiResponse(200, memory, "Memory added successfully")
    );
});

// 2. Get All Memories for a Specific Tour
const getTourMemories = asyncHandler(async (req, res) => {
    const { tourId } = req.params;

    // We only check if the tour exists; strictly speaking, we might allow 
    // public viewing later, but for now, let's restrict to owner.
    const tour = await Tour.findById(tourId);
    
    if (!tour) {
        throw new ApiError(404, "Tour not found");
    }

    if (tour.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Unauthorized");
    }

    const memories = await Memory.find({ tour: tourId }).sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, memories, "Memories fetched successfully")
    );
});

// 3. Get Single Memory
const getMemoryById = asyncHandler(async (req, res) => {
    const { memoryId } = req.params;
    
    const memory = await Memory.findById(memoryId);

    if (!memory) {
        throw new ApiError(404, "Memory not found");
    }

    if (memory.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Unauthorized");
    }

    return res.status(200).json(
        new ApiResponse(200, memory, "Memory fetched successfully")
    );
});

// 4. Update Memory (Caption/Mood only)
const updateMemory = asyncHandler(async (req, res) => {
    const { memoryId } = req.params;
    const { caption, mood, locationName } = req.body;

    const memory = await Memory.findById(memoryId);

    if (!memory) {
        throw new ApiError(404, "Memory not found");
    }

    if (memory.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Unauthorized");
    }

    if (caption !== undefined) memory.caption = caption;
    if (mood !== undefined) memory.mood = mood;
    if (locationName !== undefined) memory.locationName = locationName;

    await memory.save();

    return res.status(200).json(
        new ApiResponse(200, memory, "Memory updated successfully")
    );
});

// 5. Delete Memory
const deleteMemory = asyncHandler(async (req, res) => {
    const { memoryId } = req.params;

    const memory = await Memory.findById(memoryId);

    if (!memory) {
        throw new ApiError(404, "Memory not found");
    }

    if (memory.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Unauthorized");
    }

    // 1. Delete from Cloudinary using publicId
    await deleteFromCloudinary(memory.publicId);

    // 2. Delete from Database
    await Memory.findByIdAndDelete(memoryId);

    return res.status(200).json(
        new ApiResponse(200, {}, "Memory deleted successfully")
    );
});

export {
    addMemory,
    getTourMemories,
    getMemoryById,
    updateMemory,
    deleteMemory
};