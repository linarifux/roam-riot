import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async(req, _, next) => {
    try {
        // 1. Get token from cookie OR header
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        // 2. Strict Check: If no token or it's explicitly "undefined"/"null" string
        // This prevents the "jwt malformed" error if the frontend sends a bad header
        if (!token || token === "undefined" || token === "null") {
            throw new ApiError(401, "Unauthorized request");
        }

        // 3. Verify Token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // 4. Find User
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        req.user = user;
        next();
    } catch (error) {
        // 5. Handle Specific Errors for better debugging
        if (error.name === 'TokenExpiredError') {
            throw new ApiError(401, "Token expired");
        }
        if (error.name === 'JsonWebTokenError') {
            throw new ApiError(401, "Invalid token: jwt malformed");
        }

        throw new ApiError(401, error?.message || "Invalid access token");
    }
});