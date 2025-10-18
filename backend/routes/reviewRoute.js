// import express from "express";
// import { getProductReviews, upsertReview, deleteReview } from "../controllers/reviewController.js";
// import auth from "../middleware/auth.js";       // you already have this
// import adminAuth from "../middleware/adminAuth.js"; // you already have this

// const reviewRouter = express.Router();

// // nested under /api/product for clarity
// reviewRouter.get("/product/:id/reviews", getProductReviews);
// reviewRouter.post("/product/:id/reviews", auth, upsertReview);

// // admin moderation (optional)
// reviewRouter.delete("/review/:reviewId", adminAuth, deleteReview);

// export default reviewRouter;


import express from "express";
import { getProductReviews, upsertReview, deleteReview } from "../controllers/reviewController.js";
import authUser from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";

const reviewRouter = express.Router();

reviewRouter.get("/product/:id/reviews", getProductReviews);
reviewRouter.post("/product/:id/reviews", authUser, upsertReview);

reviewRouter.delete("/review/:reviewId", adminAuth, deleteReview);

export default reviewRouter;
