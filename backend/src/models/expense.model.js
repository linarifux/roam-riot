import mongoose, { Schema } from "mongoose";

const expenseSchema = new Schema(
  {
    tour: {
      type: Schema.Types.ObjectId,
      ref: "Tour",
      required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
      type: String, // e.g., "Street Food"
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
        type: String,
        default: "USD"
    },
    category: {
      type: String,
      enum: ["Food", "Transport", "Accommodation", "Activity", "Shopping", "Misc"],
      required: true,
    },
    receiptImage: {
        type: String // Optional Cloudinary URL for receipt
    }
  },
  { timestamps: true }
);

export const Expense = mongoose.model("Expense", expenseSchema);