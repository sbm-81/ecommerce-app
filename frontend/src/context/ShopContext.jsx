import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";

import PropTypes from "prop-types";//
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [products, setProducts] = useState([])
    const [token, setToken] = useState('')
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate();

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Please select a size');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        if(token){
            try {
                await axios.post(backendUrl + '/api/cart/add', {  itemId, size}, { headers: { token } })
                getUserCart(token)
              
            }
            catch (error) {
                console.error(error);
                toast.error('Failed to update cart');
                toast.error(error.message)
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }


        }
        return totalCount;
    }


    // useEffect(()=>{
    //     console.log(cartItems);

    // },[cartItems])

    // console.log



    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);

       
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
        if(token){
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })
                getUserCart(token)
              
            }
            catch (error) {
                console.error(error);
                toast.error('hFailed to update cart');
                toast.error(error.message)
            }
        }
    }
    

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find(product => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                }
                catch (error) {
                    console.log(error.message)
                }
            }
        }
        return totalAmount;


    }
    // const token = "eyJhbGciOiJIUzI1NiJ9.YWRtaW5AZXhhbXBsZS5jb21hZG1pbjEyMw.JRGMDpJ5UZwRD_7qIu4lTZE_eVxlw6Z9cHcL8cP4QPk";
    // console.log(token);

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list')
            // console.log(response.data);
            if (response.data.success) {
                setProducts(response.data.products);
            }
            else {
                toast.error('jFailed to load products')
            }
        } catch (error) {
            console.error("error occured:", error);
            // toast.error('Failed to load products')
            toast.error(error.message)

        }

    }

    const  getUserCart=async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get',{}, { headers: { token } })
      
        if(response.data.success){
            setCartItems(response.data.cartData)
        }
         
        }catch(error){
            console.error(error);
            toast.error('Failed to load cart')
            toast.error(error.message)
        }
    }

    
    useEffect(() => {
        getProductsData();
        
    }, [])
    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }

    },[])

    const value = {
        products, currency, delivery_fee,
        search, setSearch,
        setShowSearch, showSearch,
        cartItems, addToCart,
        getCartCount, updateQuantity,
        getCartAmount, navigate, backendUrl, getProductsData,
        token, setToken,setCartItems

    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
ShopContextProvider.propTypes = {
    children: PropTypes.node.isRequired, // Ensure children is provided
}

export default ShopContextProvider