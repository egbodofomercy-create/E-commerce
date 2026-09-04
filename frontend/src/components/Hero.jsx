import React from 'react'
import { assets } from '../assets/assets';

const Hero = () => {
  return (

    <div className='flex flex-col sm:flex-row px-6 sm:px-12 lg:px-20 py-12 bg-gradient-to-r from-white to-blue-100'>
       {/* Hero Left Side */}
    
         <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
            <div className=' text-blue-800'>
                <div className= 'flex items-center gap-2'>
                   <p className='w-8 md:w-11 h-[2px]  bg-blue-600'></p>
                   <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>

                 </div>
                 <h1 className='prata-regular text-3xl sm:py-3 lg:text-4xl leading-tight text-gray-900'>Latest Arrivals</h1>
                   <div className='flex items-center gap-2'> 
                      <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
                         <p className='w-8 md:w-11 h-[1px] bg-blue-600'></p>

                  </div>
             </div>
        </div>
      {/* Hero Right Side */}
            <div className='w-full sm:w-1/2'>
                <img className='w-full h-full object cover' src={assets.Hero_main} alt='Hero' />
               </div>
        </div>
        
  )
}

export default Hero
