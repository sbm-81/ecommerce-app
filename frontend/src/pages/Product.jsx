// // import React from 'react'

// import { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { ShopContext } from "../context/ShopContext";
// import { IoMdStar } from "react-icons/io";
// import { MdOutlineStarOutline } from "react-icons/md";
// import Stars from "../components/Stars";
// import RelatedProducts from "../components/RelatedProducts";



// function Product() {
//   const { productId } = useParams();
//   // console.log(productId);
//   const { products, currency,addToCart } = useContext(ShopContext);
//   const [productData, setProductData] = useState(false);
//   const [image, setImage] = useState('');
//   const [size, setSize] = useState('');

//   const fetchProductData = async () => {
//     products.map((item) => {
//       if (item._id === productId) {
//         setProductData(item);
//         // console.log(item);
//         setImage(item.image[0]);
//         // console.log(image);
//         return null;
//       }
//     })
//   }
//   useEffect(() => {
//     fetchProductData();
//   }, [productId])

//   return productData ? (
//     <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
//       {/* Product Data */}
//       <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
//         {/* product images */}
//         <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
//           <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.75%] w-full">
//             {
//               productData.image.map((img, index) => (
//                 <img onClick={() => setImage(img)} key={index} className="w-[24%] sm:w-full sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer" src={img} alt="" />
//               ))
//             }
//           </div>
//           <div className="w-full sm:w-[80%]">
//             <img className="w-full h-auto" src={image} alt="" />
//           </div>

//         </div>
//         {/* ---Product Info--- */}
//         <div className="flex-1">
//           <h1 className="font-medium text-2xl mt-2">
//             {productData.name}
//           </h1>
//           <div className="flex items-center gap-1 mt-2">
//             <IoMdStar />
//             <IoMdStar />
//             <IoMdStar />
//             <IoMdStar />
//             <MdOutlineStarOutline />
//             <p className="p1-2">(122)</p>

//           </div>
//           <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
//           <p className="mt-5 text-gray-500 md:w-4/5">
//             {productData.description}
//           </p>
//           <div className="flex flex-col gap-4 my-8 ">
//             <p>Select Size</p>
//             <div className="flex gap-2">
//               {
//                 productData.sizes.map((item, index) => (
//                   <button onClick={()=>setSize(item)} key={index} className={`border cursor-pointer py-2 px-4 bg-gray-100 ${item===size? 'border-orange-500':''}`}>
//                     {item}
//                   </button>
//                 ))}

//             </div>

//           </div>
//           <button onClick={()=>addToCart(productData._id,size)} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 cursor-pointer">ADD TO CART</button>
//           <hr className="mt-8 sm:w-4/5"/>
//           <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
//             <p>100% Original Product</p>
//             <p>Cash on delivery is available on this product</p>
//             <p>Easy retrun and exchange policy within 7 days</p>

//           </div>
//         </div>
//       </div>
//       {/* ---Product Description & Reviews--- */}
//       <div className="mt-20">
//         <div className="flex">
//           <b className="border px-5 py-3 text-sm">Description</b>
//           <p className="border px-5 py-3 text-sm">Reviews (122)</p>
//         </div>
//         <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
//           <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur nostrum ipsam, incidunt illo modi laudantium eaque mollitia veniam, omnis accusamus eius culpa. Quos repellat consequuntur necessitatibus doloribus pariatur, blanditiis officia.</p>
//           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique veniam debitis cupiditate nemo neque aut ad repellat provident modi consequatur.</p>
//         </div>
//       </div>
//       {/* Display Related Products */}
//       <RelatedProducts category={productData.category} subCategory={productData.subCategory}  />

//     </div>
//   ) : <div className="opacity-0"></div>
// }

// export default Product





// import { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { ShopContext } from "../context/ShopContext";
// import Stars from "../components/Stars";
// import RelatedProducts from "../components/RelatedProducts";

// function Product() {
//   const { productId } = useParams();
//   const { products, currency, addToCart } = useContext(ShopContext);

//   const [productData, setProductData] = useState(null);
//   const [image, setImage] = useState("");
//   const [size, setSize] = useState("");

//   // --- Reviews state ---
//   const [reviews, setReviews] = useState([]);
//   const [page, setPage] = useState(1);
//   const [pages, setPages] = useState(1);
//   const [loadingReviews, setLoadingReviews] = useState(false);

//   // Get product from context list by id
//   const fetchProductData = () => {
//     const found = products.find((item) => item._id === productId);
//     if (found) {
//       setProductData(found);
//       setImage(found.image?.[0] || "");
//     }
//   };

//   // Fetch reviews for this product
//   const fetchReviews = async (p = 1) => {
//     try {
//       setLoadingReviews(true);
//       const res = await fetch(`/api/product/${productId}/reviews?page=${p}&limit=10`);
//       const data = await res.json();
//       setReviews(data?.items || []);
//       setPage(data?.page || 1);
//       setPages(data?.pages || 1);
//     } catch (e) {
//       console.error("Failed to load reviews:", e);
//     } finally {
//       setLoadingReviews(false);
//     }
//   };

//   useEffect(() => {
//     fetchProductData();
//     fetchReviews(1);
//     setSize("");
//   }, [productId, products]); // re-run if list changes

//   if (!productData) return <div className="opacity-0" />;

//   return (
//     <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
//       {/* Product Data */}
//       <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
//         {/* product images */}
//         <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
//           <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.75%] w-full">
//             {productData.image?.map((img, index) => (
//               <img
//                 onClick={() => setImage(img)}
//                 key={index}
//                 className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
//                 src={img}
//                 alt=""
//               />
//             ))}
//           </div>
//           <div className="w-full sm:w-[80%]">
//             <img className="w-full h-auto" src={image} alt={productData.name} />
//           </div>
//         </div>

//         {/* ---Product Info--- */}
//         <div className="flex-1">
//           <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>

//           {/* Dynamic stars + count */}
//           <div className="flex items-center gap-2 mt-2">
//             <Stars rating={productData.avgRating || 0} />
//             <p className="pl-1 text-sm">({productData.reviewCount || 0})</p>
//           </div>

//           <p className="mt-5 text-3xl font-medium">
//             {currency}
//             {productData.price}
//           </p>

//           <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>

//           <div className="flex flex-col gap-4 my-8 ">
//             <p>Select Size</p>
//             <div className="flex gap-2">
//               {productData.sizes?.map((item, index) => (
//                 <button
//                   onClick={() => setSize(item)}
//                   key={index}
//                   className={`border cursor-pointer py-2 px-4 bg-gray-100 ${
//                     item === size ? "border-orange-500" : ""
//                   }`}
//                 >
//                   {item}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <button
//             onClick={() => addToCart(productData._id, size)}
//             className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 cursor-pointer"
//           >
//             ADD TO CART
//           </button>

//           <hr className="mt-8 sm:w-4/5" />

//           <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
//             <p>100% Original Product</p>
//             <p>Cash on delivery is available on this product</p>
//             <p>Easy return and exchange policy within 7 days</p>
//           </div>
//         </div>
//       </div>

//       {/* ---Product Description & Reviews--- */}
//       <div className="mt-20">
//         <div className="flex">
//           <b className="border px-5 py-3 text-sm">Description</b>
//           <b className="border px-5 py-3 text-sm">Reviews ({productData.reviewCount || 0})</b>
//         </div>

//         {/* Description */}
//         <div className="border px-6 py-6 text-sm text-gray-600">
//           <p className="whitespace-pre-line">{productData.description}</p>
//         </div>

//         {/* Reviews list */}
//         <div className="mt-6 border px-6 py-6 text-sm text-gray-800 flex flex-col gap-4">
//           {loadingReviews && <p>Loading reviews…</p>}
//           {!loadingReviews && reviews.length === 0 && <p>No reviews yet.</p>}

//           {reviews.map((r) => (
//             <div key={r._id} className="border-b pb-4">
//               <div className="flex items-center justify-between">
//                 <div className="font-medium">{r.user?.name || "Customer"}</div>
//                 <Stars rating={r.rating} />
//               </div>
//               {r.comment && <p className="mt-2 text-gray-700">{r.comment}</p>}
//               <p className="text-xs text-gray-400 mt-1">
//                 {r.createdAt ? new Date(r.createdAt).toLocaleString() : ""}
//               </p>
//             </div>
//           ))}

//           {pages > 1 && (
//             <div className="flex gap-2 pt-2">
//               <button
//                 disabled={page <= 1}
//                 onClick={() => fetchReviews(page - 1)}
//                 className="px-3 py-1 border disabled:opacity-50"
//               >
//                 Prev
//               </button>
//               <span className="px-2">
//                 Page {page} / {pages}
//               </span>
//               <button
//                 disabled={page >= pages}
//                 onClick={() => fetchReviews(page + 1)}
//                 className="px-3 py-1 border disabled:opacity-50"
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Write a review (requires login; your backend expects header 'token') */}
//         <ReviewForm
//           productId={productId}
//           onSubmitted={async () => {
//             await Promise.all([fetchReviews(page), fetchProductData()]);
//           }}
//         />
//       </div>

//       {/* Display Related Products */}
//       <RelatedProducts
//         category={productData.category}
//         subCategory={productData.subCategory}
//       />
//     </div>
//   );
// }

// // Inline form component; move to components/ReviewForm.jsx if you prefer.
// function ReviewForm({ productId, onSubmitted }) {
//   const token = localStorage.getItem("token"); // adjust if you store token elsewhere
//   if (!token) return null; // hide for guests

//   return (
//     <form
//       className="mt-6 border px-6 py-6 rounded-lg"
//       onSubmit={async (e) => {
//         e.preventDefault();
//         const form = new FormData(e.currentTarget);
//         const rating = Number(form.get("rating"));
//         const comment = form.get("comment");

//         await fetch(`/api/product/${productId}/reviews`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json", token },
//           body: JSON.stringify({ rating, comment }),
//         });

//         e.currentTarget.reset();
//         onSubmitted?.();
//       }}
//     >
//       <h3 className="font-semibold mb-3">Write a review</h3>

//       <label className="block mb-2">
//         Rating
//         <select name="rating" required className="ml-2 border px-2 py-1">
//           <option value="5">5</option>
//           <option value="4">4</option>
//           <option value="3">3</option>
//           <option value="2">2</option>
//           <option value="1">1</option>
//         </select>
//       </label>

//       <textarea
//         name="comment"
//         rows={3}
//         className="w-full border p-2 mb-3"
//         placeholder="Say something helpful…"
//       />

//       <button className="bg-black text-white px-4 py-2">Submit</button>
//     </form>
//   );
// }

// export default Product;



// src/pages/Product.jsx

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Stars from "../components/Stars";
import RelatedProducts from "../components/RelatedProducts";

function Product() {
  const { productId } = useParams();
  const { currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  // --- Reviews state ---
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loadingReviews, setLoadingReviews] = useState(false);

  const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";


  // add below your useState hooks in Product()
const handleAddReview = (newReview) => {
  // 1) show the new review immediately
  setReviews((prev) => [newReview, ...prev]);

  // 2) (optional) bump rating stats right away
  setProductData((prev) => {
    if (!prev) return prev;
    const oldCount = prev.reviewCount || 0;
    const oldAvg = prev.avgRating || 0;
    const newCount = oldCount + 1;
    const newAvg = ((oldAvg * oldCount) + (newReview.rating || 0)) / newCount;
    return { ...prev, reviewCount: newCount, avgRating: newAvg };
  });
};


  // Fetch the freshest product (includes avgRating/reviewCount)
  const fetchProductData = async () => {
    const res = await fetch(
      //"/api/product/single", 
      `${API}/api/product/single`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
    const data = await res.json();
    if (data?.success && data.product) {
      setProductData(data.product);
      setImage(data.product.image?.[0] || "");
    }
  };

  // Fetch reviews for this product
  // const fetchReviews = async (p = 1) => {
  //   try {
  //     setLoadingReviews(true);
  //     const res = await fetch(
  //       // `/api/product/${productId}/reviews?page=${p}&limit=10`
  //       `${API}/api/product/${productId}/reviews?page=${p}&limit=10`
  //     );
  //     const data = await res.json();
  //     setReviews(data?.items || []);
  //     setPage(data?.page || 1);
  //     setPages(data?.pages || 1);
  //   } catch (e) {
  //     console.error("Failed to load reviews:", e);
  //   } finally {
  //     setLoadingReviews(false);
  //   }
  // };

  const fetchReviews = async (p = 1) => {
    try {
      setLoadingReviews(true);
      const res = await fetch(
        `${API}/api/product/${productId}/reviews?page=${p}&limit=10`
      );
      const data = await res.json();
      // Log once to see the exact shape
      console.log("GET /reviews response:", data);

      const list =
        Array.isArray(data.items) ? data.items :
          Array.isArray(data.reviews) ? data.reviews :
            Array.isArray(data.data) ? data.data :
              [];

      setReviews(list);
      setPage(data.page || 1);
      setPages(data.pages || 1);
    } catch (e) {
      console.error("Failed to load reviews:", e);
    } finally {
      setLoadingReviews(false);
    }
  };


  useEffect(() => {
    fetchProductData();
    fetchReviews(1);
    setSize("");
  }, [productId]);

  if (!productData) return <div className="opacity-0" />;

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.75%] w-full">
            {productData.image?.map((img, index) => (
              <img
                onClick={() => setImage(img)}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                src={img}
                alt={`${productData.name} ${index + 1}`}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt={productData.name} />
          </div>
        </div>

        {/* ---Product Info--- */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>

          {/* Dynamic stars + count */}
          <div className="flex items-center gap-2 mt-2">
            <Stars rating={productData.avgRating || 0} />
            <p className="pl-1 text-sm">({productData.reviewCount || 0})</p>
          </div>

          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>

          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>

          <div className="flex flex-col gap-4 my-8 ">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes?.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={`border cursor-pointer py-2 px-4 bg-gray-100 ${item === size ? "border-orange-500" : ""
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 cursor-pointer"
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5" />

          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      {/* ---Product Description & Reviews--- */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <b className="border px-5 py-3 text-sm">
            Reviews ({productData.reviewCount || 0})
          </b>
        </div>

        {/* Description */}
        <div className="border px-6 py-6 text-sm text-gray-600">
          <p className="whitespace-pre-line">{productData.description}</p>
        </div>

        {/* Reviews list */}
        <div className="mt-6 border px-6 py-6 text-sm text-gray-800 flex flex-col gap-4">
          {loadingReviews && <p>Loading reviews…</p>}
          {!loadingReviews && reviews.length === 0 && <p>No reviews yet.</p>}

          {reviews.map((r) => (
            <div key={r._id} className="border-b pb-4">
              <div className="flex items-center justify-between">
                <div className="font-medium">{r.user?.name || "Customer"}</div>
                <Stars rating={r.rating} />
              </div>
              {r.comment && <p className="mt-2 text-gray-700">{r.comment}</p>}
              <p className="text-xs text-gray-400 mt-1">
                {r.createdAt ? new Date(r.createdAt).toLocaleString() : ""}
              </p>
            </div>
          ))}

          {pages > 1 && (
            <div className="flex gap-2 pt-2">
              <button
                disabled={page <= 1}
                onClick={() => fetchReviews(page - 1)}
                className="px-3 py-1 border disabled:opacity-50"
              >
                Prev
              </button>
              <span className="px-2">
                Page {page} / {pages}
              </span>
              <button
                disabled={page >= pages}
                onClick={() => fetchReviews(page + 1)}
                className="px-3 py-1 border disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>


        {/* <ReviewForm
          productId={productId}
          apiBase={API}            // ← pass it!
          onSubmitted={async () => {
            await Promise.all([fetchReviews(page), fetchProductData()]);
          }}
        /> */}

        {/* <ReviewForm
          productId={productId}
          apiBase={API}
          onSubmitted={async () => { await Promise.all([fetchReviews(page), fetchProductData()]); }}
          onAddReview={(r) => setReviews((prev) => [r, ...prev])}
        /> */}
        <ReviewForm
          productId={productId}
          apiBase={API}
          onSubmitted={async () => {
            // keep your refetch for correctness (it will reconcile with server)
            await Promise.all([fetchReviews(page), fetchProductData()]);
          }}
          onAddReview={handleAddReview}   // ← add this
        />



      </div>

      {/* Display Related Products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
}

// Inline form component; move to components/ReviewForm.jsx if you prefer.
// function ReviewForm({ productId, onSubmitted }) {
//   const token = localStorage.getItem("token"); // adjust if you store token elsewhere
//   if (!token) return null; // hide for guests

//   return (
//     <form
//       className="mt-6 border px-6 py-6 rounded-lg"
//       onSubmit={async (e) => {
//         e.preventDefault();
//         const form = new FormData(e.currentTarget);
//         const rating = Number(form.get("rating"));
//         const comment = form.get("comment");

//         await fetch(`/api/product/${productId}/reviews`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json", token },
//           body: JSON.stringify({ rating, comment }),
//         });

//         e.currentTarget.reset();
//         onSubmitted?.();
//       }}
//     >
//       <h3 className="font-semibold mb-3">Write a review</h3>

//       <label className="block mb-2">
//         Rating
//         <select name="rating" required className="ml-2 border px-2 py-1">
//           <option value="5">5</option>
//           <option value="4">4</option>
//           <option value="3">3</option>
//           <option value="2">2</option>
//           <option value="1">1</option>
//         </select>
//       </label>

//       <textarea
//         name="comment"
//         rows={3}
//         className="w-full border p-2 mb-3"
//         placeholder="Say something helpful…"
//       />

//       <button className="bg-black text-white px-4 py-2">Submit</button>
//     </form>
//   );
// }

// function ReviewForm({ productId, apiBase, onSubmitted }) {
//   const token = localStorage.getItem("token"); // adjust if you store it differently
//   if (!token) return null; // hide form for guests

//   return (
//     <form
//       className="mt-6 border px-6 py-6 rounded-lg"
//       onSubmit={async (e) => {
//         e.preventDefault();
//         const form = new FormData(e.currentTarget);
//         const rating = Number(form.get("rating"));
//         const comment = form.get("comment");

//         try {
//           const res = await fetch(`${apiBase}/api/product/${productId}/reviews`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               token,
//             },
//             body: JSON.stringify({ rating, comment }),
//           });

//           const data = await res.json();

//           if (!res.ok || data?.success === false) {
//             console.error("Review failed:", data);
//             alert(data?.message || "Failed to submit review");
//             return;
//           }

//           e.currentTarget.reset();
//           onSubmitted?.();
//         } catch (err) {
//           console.error(err);
//           alert("Network error while submitting review");
//         }
//       }}
//     >
//       <h3 className="font-semibold mb-3">Write a review</h3>

//       <label className="block mb-2">
//         Rating
//         <select name="rating" required className="ml-2 border px-2 py-1">
//           <option value="5">5</option>
//           <option value="4">4</option>
//           <option value="3">3</option>
//           <option value="2">2</option>
//           <option value="1">1</option>
//         </select>
//       </label>

//       <textarea
//         name="comment"
//         rows={3}
//         className="w-full border p-2 mb-3"
//         placeholder="Say something helpful…"
//       />

//       <button className="bg-black text-white px-4 py-2">Submit</button>
//     </form>
//   );
// }

function ReviewForm({ productId, apiBase, onSubmitted, onAddReview }) {
  const token = localStorage.getItem("token");
  if (!token) return null;

  return (
    <form
      className="mt-6 border px-6 py-6 rounded-lg"
      onSubmit={async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const rating = Number(form.get("rating"));
        const comment = form.get("comment");

        try {
          const res = await fetch(`${apiBase}/api/product/${productId}/reviews`, {
            method: "POST",
            headers: { "Content-Type": "application/json", token },
            body: JSON.stringify({ rating, comment }),
          });
          const data = await res.json();

          if (!res.ok || data?.success === false) {
            console.error("Review failed:", data);
            alert(data?.message || "Failed to submit review");
            return;
          }

          // ✅ OPTIMISTIC UPDATE: push the new review into UI immediately
          if (data.review) {
            onAddReview?.(data.review);
          } else {
            // fallback if API doesn't return the review object
            onAddReview?.({
              _id: crypto.randomUUID?.() || Date.now().toString(),
              rating,
              comment,
              createdAt: new Date().toISOString(),
              user: { name: "You" }, // optional placeholder
            });
          }

          e.currentTarget.reset();

          // Still refetch to stay in sync with server (counts, averages, pagination)
          onSubmitted?.();
        } catch (err) {
          console.error(err);
          alert("Network error while submitting review");
        }
      }}
    >
      <h3 className="font-semibold mb-3">Write a review</h3>

      <label className="block mb-2">
        Rating
        <select name="rating" required className="ml-2 border px-2 py-1">
          <option value="5">5</option>
          <option value="4">4</option>
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="1">1</option>
        </select>
      </label>

      <textarea
        name="comment"
        rows={3}
        className="w-full border p-2 mb-3"
        placeholder="Say something helpful…"
      />

      <button className="bg-black text-white px-4 py-2">Submit</button>
    </form>
  );
}


export default Product;
