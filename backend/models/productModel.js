// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//     name: {type: String, required: true},
//     // description: {type: String, required: true},
//     price: {type: Number, required: true},
//     description: {type: String, required: true},
//     image: {type: Array, required: true},
//     category: {type: String, required: true},
//     subCategory: {type: String, required: true},
//     sizes: {type: Array, required: true},
//     bestSeller: {type: Boolean},
//     // quantity: {type: Number, required: true},
//     date: {type: Number, required: true}
//     // rating: {type: Number, required: true},
//     // reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}]

// })

// const ProductModel = mongoose.models.product || mongoose.model('Product', productSchema);


// export default ProductModel;



import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  price:       { type: Number, required: true },
  description: { type: String, required: true },
  image:       { type: Array,  required: true },
  category:    { type: String, required: true },
  subCategory: { type: String, required: true },
  sizes:       { type: Array,  required: true },
  bestSeller:  { type: Boolean },
  date:        { type: Number, required: true },

  // NEW: denormalized review stats
  avgRating:   { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
});

// keep your original model name "Product"
const ProductModel =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default ProductModel;
