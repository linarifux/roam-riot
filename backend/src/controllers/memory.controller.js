import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Memory } from "../models/memory.model.js";
import { Tour } from "../models/tour.model.js";
import { deleteFromCloudinary } from "../utils/cloudinary.js"; 

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

    // Check for file (Uploaded via Middleware)
    // The middleware places the Cloudinary URL in req.file.path
    if (!req.file || !req.file.path) {
        throw new ApiError(400, "Media file (Image/Video) is required");
    }

    // Extract Cloudinary Data from Multer
    const mediaUrl = req.file.path;
    const publicId = req.file.filename; // Cloudinary "public_id" is stored in filename by the storage engine

    // Determine type based on Mime Type provided by Multer
    const isVideo = req.file.mimetype.startsWith("video/");
    const mediaType = isVideo ? "VIDEO" : "IMAGE";

    const memory = await Memory.create({
        tour: tourId,
        owner: req.user._id,
        type: mediaType,
        mediaUrl: mediaUrl,
        publicId: publicId, 
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

    const tour = await Tour.findById(tourId);
    
    if (!tour) {
        throw new ApiError(404, "Tour not found");
    }

    // Strict ownership check
    if (tour.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Unauthorized request");
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
    if (memory.publicId) {
        // Critical: Must specify resource_type for videos, otherwise deletion fails silently
        const resourceType = memory.type === "VIDEO" ? "video" : "image";
        await deleteFromCloudinary(memory.publicId, resourceType);
    }

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