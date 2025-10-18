// import React from 'react'

// import { Link } from "react-router-dom";
// import { ShopContext } from "../context/ShopContext"
// import { useContext } from "react";
// import PropTypes from "prop-types";

// function ProductItem({ id, image, name, price }) {

//     const { currency } = useContext(ShopContext);
    
//     return (
//         <Link className="text-gray-700 cursor-pointer" to={`product/${id}`}>
//             <div className="overflow-hidden">
//                 <img className="hover:scale-110 transition ease-in-out" src={image[0]} alt="" />

//             </div>
//             <p className="pt-3 pb-1 text-sm">{name}</p>
//             <p className="text-sm font-medium">{currency}{price}</p>
//         </Link>

//     )
// }
// ProductItem.propTypes = {
//     id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Ensure id is string or number
//     image: PropTypes.arrayOf(PropTypes.string).isRequired, // Ensure image is an array of strings
//     name: PropTypes.string.isRequired, // Ensure name is a required string
//     price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Ensure price is string or number
// };

// export default ProductItem



import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { useContext } from "react";
import PropTypes from "prop-types";

function ProductItem({ id, image, name, price }) {
  const { currency } = useContext(ShopContext);
  const cover = Array.isArray(image) ? image[0] : image;

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="overflow-hidden">
        <img className="hover:scale-110 transition ease-in-out" src={cover} alt={name} />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency}{price}
      </p>
    </Link>
  );
}

ProductItem.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  image: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]).isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default ProductItem;
