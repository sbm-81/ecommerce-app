// import reviewModel from "../models/ReviewModel.js";
// import { recomputeProductRating } from "../utils/reviewStats.js";

// // GET /api/product/:id/reviews?page=1&limit=10
// export const getProductReviews = async (req, res) => {
//   const { id } = req.params;
//   const page  = Math.max(1, Number(req.query.page) || 1);
//   const limit = Math.min(50, Number(req.query.limit) || 10);
//   const skip  = (page - 1) * limit;

//   const [items, total] = await Promise.all([
//     reviewModel.find({ product: id })
//       .sort({ createdAt: -1 })
//       .skip(skip).limit(limit)
//       .populate("user", "name"),
//     reviewModel.countDocuments({ product: id })
//   ]);

//   res.json({ items, total, page, pages: Math.ceil(total / limit) });
// };

// // POST /api/product/:id/reviews
// // body: { rating: number(1..5), comment?: string }
// export const upsertReview = async (req, res) => {
//   const { id } = req.params;       // product id
//   const { rating, comment } = req.body;

//   // req.user is set by your existing auth middleware
//   const review = await reviewModel.findOneAndUpdate(
//     { product: id, user: req.user._id },
//     { rating, comment },
//     { upsert: true, new: true, setDefaultsOnInsert: true }
//   );

//   await recomputeProductRating(id);
//   res.status(201).json(review);
// };

// // DELETE /api/review/:reviewId  (admin moderation – optional)
// export const deleteReview = async (req, res) => {
//   const { reviewId } = req.params;
//   const deleted = await reviewModel.findByIdAndDelete(reviewId);
//   if (deleted) await recomputeProductRating(deleted.product);
//   res.json({ ok: true });
// };



import ReviewModel from "../models/reviewModel.js";
import { recomputeProductRating } from "../utils/reviewStats.js";

// GET /api/product/:id/reviews?page=1&limit=10
// export const getProductReviews = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const page  = Math.max(1, Number(req.query.page) || 1);
//     const limit = Math.min(50, Number(req.query.limit) || 10);
//     const skip  = (page - 1) * limit;

//     const [items, total] = await Promise.all([
//       ReviewModel.find({ product: id })
//         .sort({ createdAt: -1 })
//         .skip(skip).limit(limit)
//         .populate("user", "name"),
//       ReviewModel.countDocuments({ product: id })
//     ]);

//     res.json({ success: true, items, total, page, pages: Math.ceil(total / limit) });
//   } catch (e) {
//     res.status(500).json({ success: false, message: e.message });
//   }
// };


// GET /api/product/:id/reviews?page=1&limit=10
export const getProductReviews = async (req, res) => {
  try {
    const { id } = req.params;               // product id
    const page  = Math.max(1, Number(req.query.page) || 1);   // pagination: page number
    const limit = Math.min(50, Number(req.query.limit) || 10); // pagination: number of reviews per page
    const skip  = (page - 1) * limit;

    const [items, total] = await Promise.all([
      // Find reviews for the product, skipping and limiting based on page and limit
      ReviewModel.find({ product: id })
        .sort({ createdAt: -1 })      // Sort by newest first
        .skip(skip)
        .limit(limit)
        .populate({ path: "user", select: "name" }),  // Populate user name
      // Count total reviews for pagination
      ReviewModel.countDocuments({ product: id })
    ]);

    res.json({
      success: true,
      items,         // List of reviews
      total,         // Total number of reviews
      page,          // Current page number
      pages: Math.ceil(total / limit),  // Total pages
    });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};


// POST /api/product/:id/reviews   header: token: <jwt>
// body: { rating, comment }
// export const upsertReview = async (req, res) => {
//   try {
//     const { id } = req.params; // product id
//     const { rating, comment, userId } = req.body;

//     if (!userId) return res.status(401).json({ success: false, message: "Not authorized" });

//     // Clamp rating 1..5
//     const saneRating = Math.max(1, Math.min(5, Number(rating)));

//     // Create or update the review
//     const review = await ReviewModel.findOneAndUpdate(
//       { product: id, user: userId },
//       { rating: saneRating, comment },
//       { upsert: true, new: true, setDefaultsOnInsert: true }
//     );

//     // Recompute product rating after review is created/updated
//     await recomputeProductRating(id);

//     res.status(201).json({ success: true, review });
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ success: false, message: e.message });
//   }
// };

// POST /api/product/:id/reviews

// POST /api/product/:id/reviews
export const upsertReview = async (req, res) => {
  try {
    const { id } = req.params;           // product id
    const { rating, comment, userId } = req.body;  // assuming you send userId in the body, or you can fetch it from the token

    if (!userId) {
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    // Clamp rating between 1 and 5
    const saneRating = Math.max(1, Math.min(5, Number(rating)));

    // Create or update the review for the product
    const review = await ReviewModel.findOneAndUpdate(
      { product: id, user: userId },  // Look for the review by product and user
      { rating: saneRating, comment },  // Update the review with rating and comment
      { upsert: true, new: true, setDefaultsOnInsert: true }  // Create if not found
    );

    // Recompute product rating (not part of the upsert, but optional)
    await recomputeProductRating(id);

    // Populate user data (getting the name of the user from the User model)
    const populatedReview = await review.populate({ path: "user", select: "name" });

    // Respond with the populated review (user name included)
    res.status(201).json({ success: true, review: populatedReview });

  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: e.message });
  }
};


// DELETE /api/review/:reviewId    (admin only)
export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const deleted = await ReviewModel.findByIdAndDelete(reviewId);
    if (deleted) await recomputeProductRating(deleted.product);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};
