import React from 'react'
import { assets } from '../assets/assets'
const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
           <div>
            <img src={assets.logo} className='mb-5 w-32' alt="" />
            <p className='w-full md:w-2/3 text-blue-600 '>
                Bluvory is a brand that caters for style elevations and style upgrades.In the past 4years, we have been able to help over 500 people to boost their looks with our accessories.
            </p>

           </div>
           <div>
             <p className='text-xl font-medium mb-5 '>
                 COMPANY
             </p>
             <ul className='flex flex-col gap-1 text-blue-600'>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
             </ul>

           </div>
             <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-blue-600'>
                    <li> 07026277036 </li>
                    <li>bluvoryaccessories@gmail.com</li>
                </ul>
             </div>

        </div>
      <div> 
         <hr />
         <p className='py-5 text-sm text-center'>copyright 2026@ bluvory.com- All right</p>

      </div>
    </div>
  )
}

export default Footer
