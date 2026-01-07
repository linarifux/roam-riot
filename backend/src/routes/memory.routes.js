import { Router } from "express";
import { 
    addMemory, 
    getTourMemories, 
    getMemoryById, 
    updateMemory, 
    deleteMemory 
} from "../controllers/memory.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.use(verifyJWT); // Secure all routes

// Routes involving Tour ID
router.route("/tour/:tourId")
    .get(getTourMemories)
    .post(upload.single("mediaFile"), addMemory); // Expects field name 'mediaFile'

// Routes involving Memory ID
router.route("/:memoryId")
    .get(getMemoryById)
    .patch(updateMemory)
    .delete(deleteMemory);

export default router;