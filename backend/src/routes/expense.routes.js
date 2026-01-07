import { Router } from "express";
import { 
    addExpense, 
    getTourExpenses, 
    deleteExpense 
} from "../controllers/expense.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.use(verifyJWT);

// Routes involving Tour ID
router.route("/tour/:tourId")
    .get(getTourExpenses)
    .post(upload.single("receipt"), addExpense); // Expects field name 'receipt'

// Routes involving Expense ID
router.route("/:expenseId")
    .delete(deleteExpense);

export default router;