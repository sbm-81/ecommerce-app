// import React from 'react'

import { assets } from "../assets/assets"
import NewsLetterBox from "../components/NewsLetterBox"
import Title from "../components/Title"

function Contact() {
  return (
    <div>
      <div>
        <Title text1={'CONTACT '} text2={'US'}></Title>
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img className="w-full md:max-w-[480px]" src={assets.p_img25} alt="" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">suite 350, Washington, USA</p>
          <p className="text-gray-500">Email:admin@ABELECTRIC.com</p>
          <p className="font-semibold text-xl text-gray-600">Carrers at A.B.ELECTRIC</p>
          <p className="text-gray-500">Learn More about us</p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">Explore Jobs</button>
        </div>
      </div>
      <NewsLetterBox/>
      
      
    </div>
  )
}

export default Contact
