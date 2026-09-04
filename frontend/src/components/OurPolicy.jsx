import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 sm:text-sm md:text-base  text-blue-700'>
       <div>
          <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt=""/>
               <p className='font-semibold '>Easy Exchange Policy</p>
               <p className='text-blue-400'>We Offer hassle free exchange policy</p>
        </div>  
        
       <div>
          <img src={assets.customer_icon} className='w-12 m-auto mb-5' alt=""/>
               <p className='font-semibold '>24/7 Support</p>
               <p className='text-blue-400'>Dedicated support</p>
        </div>  
        
       <div>
          <img src={assets.delivery_icon} className='w-12 m-auto mb-5' alt=""/>
               <p className='font-semibold '>Secured Shipping</p>
               <p className='text-blue-400'>Concierge services</p>
        </div>    
      




    </div>
  )
}

export default OurPolicy
