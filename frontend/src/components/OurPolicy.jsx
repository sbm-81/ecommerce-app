// import React from 'react'
// import { assets } from "../assets/assets"
import { FaHandsHelping } from "react-icons/fa";
import { MdCurrencyExchange } from "react-icons/md";
import { IoReturnUpForwardSharp } from "react-icons/io5";





function OurPolicy() {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      <div className="">
        
        <MdCurrencyExchange className="w-12 m-auto mb-5" />
        <p className="font-semibold">Easy Exchange Policy</p>
        <p className="text-gray-400">We offer hassle free exchange policy</p>
      </div>
      <div>  
        <IoReturnUpForwardSharp className="w-12 m-auto mb-5" />
        <p className="font-semibold">7 days return policy</p>
        <p className="text-gray-400">We provide 7 days free return policy</p>
      </div>
      <div>
        <FaHandsHelping className="w-12 m-auto mb-5" />
        <p className="font-semibold">Best Customer Support</p>
        <p className="text-gray-400">We provide 24/7 customer support</p>
      </div>
    </div>
  )
}

export default OurPolicy
