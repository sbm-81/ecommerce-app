// import mongoose from "mongoose";

// const reviewSchema = new mongoose.Schema(
//   {
//     product: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true, index: true },
//     user:    { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
//     rating:  { type: Number, min: 1, max: 5, required: true },
//     comment: { type: String, trim: true },
//   },
//   { timestamps: true }
// );

// // optional: only one review per user per product
// reviewSchema.index({ product: 1, user: 1 }, { unique: true });

// const reviewModel = mongoose.models.review || mongoose.model("review", reviewSchema);
// export default reviewModel;


// import mongoose from "mongoose";

// const reviewSchema = new mongoose.Schema(
//   {
//     product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true, index: true },
//     user:    { type: mongoose.Schema.Types.ObjectId, ref: "user",    required: true },
//     rating:  { type: Number, min: 1, max: 5, required: true },
//     comment: { type: String, trim: true },
//   },
//   { timestamps: true }
// );

// // optional: prevent duplicate reviews per user per product
// reviewSchema.index({ product: 1, user: 1 }, { unique: true });

// const ReviewModel =
//   mongoose.models.Review || mongoose.model("Review", reviewSchema);

// export default ReviewModel;


// backend/models/reviewModel.js
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    // Product model in your app is named "Product" (capital P)
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true, index: true },

    // User model is named "user" (lowercase) in userModel.js
    user:    { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },

    rating:  { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, trim: true },
  },
  { timestamps: true }
);

// one review per user per product (optional)
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

export default mongoose.models.Review || mongoose.model("Review", reviewSchema);

