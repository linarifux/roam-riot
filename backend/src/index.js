import dotenv from "dotenv";
import connectDB from "./config/db.js";
import express from "express"; // Import express here
import cors from "cors";
import cookieParser from "cookie-parser";
import { LIMIT } from "./constants.js";

// Load env
dotenv.config({
  path: "./.env",
});

const app = express(); // Initialize app here

// --- Middleware Config ---
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));
app.use(express.json({ limit: LIMIT }));
app.use(express.urlencoded({ extended: true, limit: LIMIT }));
app.use(express.static("public"));
app.use(cookieParser());


// --- Routes Import ---
import userRouter from './routes/user.routes.js';
import tourRouter from './routes/tour.routes.js'; // Import here
import memoryRouter from './routes/memory.routes.js';
import expenseRouter from './routes/expense.routes.js';


// --- Routes Declaration ---
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tours", tourRouter); // Add this line
app.use("/api/v1/memories", memoryRouter); // Add this line
app.use("/api/v1/expenses", expenseRouter); // Add this line


// --- Database & Server Start ---
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️  Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });