// import React from 'react'
import { assets } from "../assets/assets"

function Footer() {
  return (
    <div>
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 test-sm">
      <div>
      <img src={assets.p_img22} className='mb-5 w-32' alt="" />
        <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius itaque illo placeat quas, assumenda quaerat soluta provident? Unde, numquam voluptatibus?
        </p>

      </div>
      <div>
        <p className="text-xl font-medium mb-5">COMPANY</p>
        <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
        </ul>
      </div>
      <div>
        <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
        <ul className="flex flex-col gap-1 text-gray-600">
            <li>Email: 123@example.com</li>
            <li>Phone: +1234567890</li>
            <li>Address: 123 Main St, City, State, ZIP</li>
        </ul>
 
      </div>
      
    </div>
    <div>
    <hr />
    <p className=" py-5 text-sm text-center">Copyright 2024@ AB Electric.com - All rights reserved.</p>
  </div>
    </div>
  )
}

export default Footer
