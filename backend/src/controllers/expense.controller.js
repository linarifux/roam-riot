import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Expense } from "../models/expense.model.js";
import { Tour } from "../models/tour.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";

// 1. Add an Expense
const addExpense = asyncHandler(async (req, res) => {
    const { tourId } = req.params;
    const { title, amount, category, currency } = req.body;

    if (!title || !amount || !category) {
        throw new ApiError(400, "Title, Amount, and Category are required");
    }

    // Validate Tour
    const tour = await Tour.findById(tourId);
    if (!tour) {
        throw new ApiError(404, "Tour not found");
    }
    
    if (tour.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You cannot add expenses to this tour");
    }

    // Optional: Upload Receipt Image
    let receiptUrl = "";
    if (req.file?.path) {
        const uploadResponse = await uploadOnCloudinary(req.file.path);
        if (uploadResponse) {
            receiptUrl = uploadResponse.url;
        }
    }

    const expense = await Expense.create({
        tour: tourId,
        owner: req.user._id,
        title,
        amount: Number(amount),
        currency: currency || "USD",
        category,
        receiptImage: receiptUrl
    });

    return res.status(201).json(
        new ApiResponse(200, expense, "Expense added successfully. Wallet crying...")
    );
});

// 2. Get All Expenses for a Tour + Calculate Total Spent
const getTourExpenses = asyncHandler(async (req, res) => {
    const { tourId } = req.params;

    // Validate Tour
    const tour = await Tour.findById(tourId);
    if (!tour) {
        throw new ApiError(404, "Tour not found");
    }

    if (tour.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Unauthorized");
    }

    // Fetch expenses sorted by newest first
    const expenses = await Expense.find({ tour: tourId }).sort({ createdAt: -1 });

    // Calculate total spent manually (or we could use MongoDB aggregation)
    const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);

    const data = {
        expenses,
        tourBudget: tour.budgetLimit,
        totalSpent,
        remainingBudget: tour.budgetLimit - totalSpent
    };

    return res.status(200).json(
        new ApiResponse(200, data, "Expenses fetched successfully")
    );
});

// 3. Delete Expense
const deleteExpense = asyncHandler(async (req, res) => {
    const { expenseId } = req.params;

    const expense = await Expense.findById(expenseId);

    if (!expense) {
        throw new ApiError(404, "Expense not found");
    }

    if (expense.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Unauthorized");
    }

    await Expense.findByIdAndDelete(expenseId);

    return res.status(200).json(
        new ApiResponse(200, {}, "Expense removed. Did you get a refund?")
    );
});

export {
    addExpense,
    getTourExpenses,
    deleteExpense
};