import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Tour } from "../models/tour.model.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";

// 1. Create a New Tour
const createTour = asyncHandler(async (req, res) => {
    const { title, description, startDate, endDate, budgetLimit, locations } = req.body;

    if (!title || !startDate) {
        throw new ApiError(400, "Title and Start Date are required");
    }

    // Handle Cover Image Upload
    let coverImageUrl = "";
    if (req.file?.path) {
        const uploadResponse = await uploadOnCloudinary(req.file.path);
        if (uploadResponse) {
            coverImageUrl = uploadResponse.url;
        }
    }

    // Parse locations if sent as JSON string (common with FormData)
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
        owner: req.user._id, // From verifyJWT middleware
        status: "Planned"
    });

    return res.status(201).json(
        new ApiResponse(200, tour, "Tour created successfully")
    );
});

// 2. Get All Tours for the Logged-in User
const getUserTours = asyncHandler(async (req, res) => {
    // Pagination (Optional but good practice)
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const tours = await Tour.find({ owner: req.user._id })
        .sort({ startDate: -1 }) // Newest trips first
        .skip(skip)
        .limit(parseInt(limit));
    
    // Optional: Get total count for frontend pagination
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

    // Security Check: Ensure the user owns this tour
    if (tour.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You do not have permission to view this tour");
    }

    return res.status(200).json(
        new ApiResponse(200, tour, "Tour details fetched successfully")
    );
});

// 4. Update Tour (Status, Budget, Info)
const updateTour = asyncHandler(async (req, res) => {
    const { tourId } = req.params;
    const { title, description, status, budgetLimit, endDate } = req.body;

    // We fetch the tour first to check ownership
    const tour = await Tour.findById(tourId);

    if (!tour) {
        throw new ApiError(404, "Tour not found");
    }

    if (tour.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Unauthorized request");
    }

    // Handle new Cover Image if uploaded
    if (req.file?.path) {
        const uploadResponse = await uploadOnCloudinary(req.file.path);
        
        // If upload successful, delete old image to save space (Optional optimization)
        // if (tour.coverImage) { ... logic to extract publicId and delete ... }

        if (uploadResponse) {
            tour.coverImage = uploadResponse.url;
        }
    }

    // Update fields if provided
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

    // TODO: In the future, we should also delete all associated Memories and Expenses here
    // await Memory.deleteMany({ tour: tourId });
    // await Expense.deleteMany({ tour: tourId });

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