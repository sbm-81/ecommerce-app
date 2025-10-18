// import mongoose from "mongoose";
// import reviewModel from "../models/ReviewModel.js";
// import productModel from "../models/productModel.js";

// export async function recomputeProductRating(productId) {
//   const [stats] = await reviewModel.aggregate([
//     { $match: { product: new mongoose.Types.ObjectId(productId) } },
//     { $group: { _id: "$product", reviewCount: { $sum: 1 }, avgRating: { $avg: "$rating" } } }
//   ]);

//   const update = stats
//     ? { reviewCount: stats.reviewCount, avgRating: Number(stats.avgRating.toFixed(2)) }
//     : { reviewCount: 0, avgRating: 0 };

//   await productModel.findByIdAndUpdate(productId, update);
// }


// import mongoose from "mongoose";
// import ReviewModel from "../models/reviewModel.js";
// import ProductModel from "../models/productModel.js";

// export async function recomputeProductRating(productId) {
//   const [stats] = await ReviewModel.aggregate([
//     { $match: { product: new mongoose.Types.ObjectId(productId) } },
//     { $group: { _id: "$product", reviewCount: { $sum: 1 }, avgRating: { $avg: "$rating" } } }
//   ]);

//   await ProductModel.findByIdAndUpdate(productId, {
//     reviewCount: stats ? stats.reviewCount : 0,
//     avgRating:   stats ? Number(stats.avgRating.toFixed(2)) : 0,
//   });
// }



// import mongoose from "mongoose"; // <-- Add this import
// import ReviewModel from "../models/reviewModel.js";
// import ProductModel from "../models/productModel.js";

// export async function recomputeProductRating(productId) {
//   const [stats] = await ReviewModel.aggregate([
//     { $match: { product: new mongoose.Types.ObjectId(productId) } },  // <-- needs mongoose.Types.ObjectId
//     { $group: { _id: "$product", reviewCount: { $sum: 1 }, avgRating: { $avg: "$rating" } } }
//   ]);

//   await ProductModel.findByIdAndUpdate(productId, {
//     reviewCount: stats ? stats.reviewCount : 0,
//     avgRating:   stats ? Number(stats.avgRating.toFixed(2)) : 0,
//   });
// }



// import mongoose from "mongoose";
// import ReviewModel from "../models/reviewModel.js";
// import ProductModel from "../models/productModel.js";

// export async function recomputeProductRating(productId) {
//   const [stats] = await ReviewModel.aggregate([
//     { $match: { product: new mongoose.Types.ObjectId(productId) } },
//     { $group: { _id: "$product", reviewCount: { $sum: 1 }, avgRating: { $avg: "$rating" } } }
//   ]);

//   // Log stats to check if calculation is correct
//   console.log('Recomputing rating for productId:', productId);
//   console.log('Stats:', stats);

//   await ProductModel.findByIdAndUpdate(productId, {
//     reviewCount: stats ? stats.reviewCount : 0,
//     avgRating:   stats ? Number(stats.avgRating.toFixed(2)) : 0,
//   });

//   console.log('Product updated:', productId);
// }


import mongoose from "mongoose";
import ReviewModel from "../models/reviewModel.js";
import ProductModel from "../models/productModel.js";

export async function recomputeProductRating(productId) {
  try {
    const [stats] = await ReviewModel.aggregate([
      { $match: { product: new mongoose.Types.ObjectId(productId) } },
      { $group: { _id: "$product", reviewCount: { $sum: 1 }, avgRating: { $avg: "$rating" } } }
    ]);

    if (!stats) return;

    // Log to verify
    console.log('Recomputing rating for productId:', productId);
    console.log('Calculated stats:', stats);

    // Update the product document with the new avgRating and reviewCount
    await ProductModel.findByIdAndUpdate(productId, {
      reviewCount: stats.reviewCount,
      avgRating:   Number(stats.avgRating.toFixed(2)) // Round to 2 decimal places
    });

    console.log(`Product updated: ${productId} with avgRating: ${stats.avgRating} and reviewCount: ${stats.reviewCount}`);
  } catch (error) {
    console.error('Error updating product rating:', error);
  }
}
