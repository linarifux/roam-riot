        import { Router } from "express";
import { 
    createTour, 
    getUserTours, 
    getTourById, 
    updateTour, 
    deleteTour 
} from "../controllers/tour.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// Apply Auth Middleware to all tour routes
router.use(verifyJWT);

router.route("/")
    .get(getUserTours)
    .post(upload.single("coverImage"), createTour);

router.route("/:tourId")
    .get(getTourById)
    .patch(upload.single("coverImage"), updateTour)
    .delete(deleteTour);

export default router;