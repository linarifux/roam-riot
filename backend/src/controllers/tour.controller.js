import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Tour } from "../models/tour.model.js";
import { deleteFromCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";

// 1. Create a New Tour
const createTour = asyncHandler(async (req, res) => {
    const { title, description, startDate, endDate, budgetLimit, locations } = req.body;

    if (!title || !startDate) {
        throw new ApiError(400, "Title and Start Date are required");
    }

    // Handle Cover Image (Uploaded via Middleware)
    let coverImageUrl = "";
    let coverImagePublicId = ""; // Helper to store public_id for future deletion

    if (req.file && req.file.path) {
        coverImageUrl = req.file.path;
        coverImagePublicId = req.file.filename;
    }

    // Parse locations
    let parsedLocations = [];
    if (locations) {
        try {
            parsedLocations = typeof locations === 'string' ? JSON.parse(locations) : locations;
        } catch (error) {
            throw new ApiError(400, "Invalid format for locations");
        }
    }

    const tour = await Tour.create({
        title,
        description: description || "",
        startDate,
        endDate: endDate || null,
        budgetLimit: budgetLimit || 0,
        locations: parsedLocations,
        coverImage: coverImageUrl,
        coverImagePublicId: coverImagePublicId, // Make sure your Tour Model has this field!
        owner: req.user._id,
        status: "Planned"
    });

    return res.status(201).json(
        new ApiResponse(200, tour, "Tour created successfully")
    );
});

// 2. Get All Tours for the Logged-in User
const getUserTours = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const tours = await Tour.find({ owner: req.user._id })
        .sort({ startDate: -1 })
        .skip(skip)
        .limit(parseInt(limit));
    
    const totalTours = await Tour.countDocuments({ owner: req.user._id });

    return res.status(200).json(
        new ApiResponse(200, { tours, totalTours }, "User tours fetched successfully")
    );
});

// 3. Get Single Tour Details
const getTourById = asyncHandler(async (req, res) => {
    const { tourId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(tourId)) {
        throw new ApiError(400, "Invalid Tour ID");
    }

    const tour = await Tour.findById(tourId);

    if (!tour) {
        throw new ApiError(404, "Tour not found");
    }

    if (tour.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You do not have permission to view this tour");
    }

    return res.status(200).json(
        new ApiResponse(200, tour, "Tour details fetched successfully")
    );
});

// 4. Update Tour
const updateTour = asyncHandler(async (req, res) => {
    const { tourId } = req.params;
    const { title, description, status, budgetLimit, endDate } = req.body;

    const tour = await Tour.findById(tourId);

    if (!tour) {
        throw new ApiError(404, "Tour not found");
    }

    if (tour.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Unauthorized request");
    }

    // Handle new Cover Image if uploaded
    if (req.file && req.file.path) {
        // 1. Delete old image if it exists and has a public_id
        if (tour.coverImagePublicId) {
            await deleteFromCloudinary(tour.coverImagePublicId);
        }

        // 2. Set new image details
        tour.coverImage = req.file.path;
        tour.coverImagePublicId = req.file.filename;
    }

    if (title) tour.title = title;
    if (description) tour.description = description;
    if (status) tour.status = status;
    if (budgetLimit) tour.budgetLimit = budgetLimit;
    if (endDate) tour.endDate = endDate;

    await tour.save();

    return res.status(200).json(
        new ApiResponse(200, tour, "Tour updated successfully")
    );
});

// 5. Delete Tour
const deleteTour = asyncHandler(async (req, res) => {
    const { tourId } = req.params;

    const tour = await Tour.findById(tourId);

    if (!tour) {
        throw new ApiError(404, "Tour not found");
    }

    if (tour.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Unauthorized request");
    }

    // 1. Clean up Cloudinary Image
    if (tour.coverImagePublicId) {
        await deleteFromCloudinary(tour.coverImagePublicId);
    }

    // 2. Delete Tour from DB
    await Tour.findByIdAndDelete(tourId);

    return res.status(200).json(
        new ApiResponse(200, {}, "Tour deleted successfully")
    );
});

export {
    createTour,
    getUserTours,
    getTourById,
    updateTour,
    deleteTour
};