// import React from 'react'

import { Link, NavLink } from "react-router-dom"
import { assets } from "../assets/assets"
import { IoIosSearch } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { LuShoppingCart } from "react-icons/lu";
import { MdMenu } from "react-icons/md";
import { useContext, useState } from "react";
// import { IoIosArrowDropdown } from "react-icons/io";
// import { RiArrowDropLeftLine } from "react-icons/ri";
// import { RiArrowDropLeftFill } from "react-icons/ri";
import { RiArrowDropRightLine } from "react-icons/ri";
import { ShopContext } from "../context/ShopContext";


function Navbar() {
  const [visible, setVisible] = useState(false);
  const {setShowSearch,getCartCount,navigate,token,setToken,setCartItems} = useContext(ShopContext);
  const logout=()=>{
    navigate('/login')
    localStorage.removeItem('token');
    setToken('');
    setCartItems({})
    
  }
  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to='/'><img src={assets.p_img22} className='w-36' alt="" /></Link>
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p>Home</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/collection' className='flex flex-col items-center gap-1'>
          <p>COLLECTION</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p>ABOUT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p>CONTACT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

      </ul>
      <div className="flex items-center gap-6">
        <IoIosSearch onClick={()=>setShowSearch(true)} className="w-5 cursor-pointer"/>
        <div className="group relative">
          <CgProfile onClick={()=>token?null:navigate('/login')} className="w-5 cursor-pointer" />  
          {/* <Link to='/login'></Link> removed */}
            {/* Dropdown Menu */}
            {token&&
              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-400 rounded">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p onClick={()=>navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
                <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
              </div>
            </div>
            }

        
        </div>
        <Link to='/cart' className="">
          <div className="relative">
            <LuShoppingCart />
            <p className='absolute right-[-5px] bottom-[-5px] w-3 text-center leading-3 bg-black text-white aspect-square rounded-full text-[8px]'>
              {getCartCount()}
            </p>
          </div>
        </Link>
        <MdMenu onClick={() => setVisible(true)} className="w-5 cursor-pointer sm:hidden" />
        {/* sidebar menu for smaller screen */}

      </div>
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible? 'w-full':'w-0'}`}>
          <div className="flex flex-col text-gray-600">
            <div onClick={()=>setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">
            <RiArrowDropRightLine className="h4 rotate-180"/>
            <p>Back</p>

            </div>
            <NavLink onClick={()=>setVisible(false)} className="py-2 p1-6 border" to="/">HOME</NavLink>
            <NavLink onClick={()=>setVisible(false)} className="py-2 p1-6 border" to="/collection">COLLECTION</NavLink>
            <NavLink onClick={()=>setVisible(false)} className="py-2 p1-6 border" to="/about">ABOUT</NavLink>
            <NavLink onClick={()=>setVisible(false)} className="py-2 p1-6 border" to="/contact">CONTACT</NavLink>

          </div>
      </div>
    </div>
  )
}

export default Navbar
