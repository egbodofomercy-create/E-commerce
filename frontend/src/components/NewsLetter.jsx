import React from 'react'

const NewsLetter = () => {

    const onSubmit = (event) => {
         event.preventDefault();


    }
  return (
    <div className='text-center'>
      <p className='text-xl font-medium text-blue-600'>10% off on first order</p>
      <p className='text-blue-300 mt-3'>Wavy in blings </p>
    
        <form onSubmit = {onSubmit} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
      <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your email'
         />

        <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
         </form>
    </div>
  )
}

export default NewsLetter
