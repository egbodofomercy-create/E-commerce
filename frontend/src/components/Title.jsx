import React from 'react'
import ProductItem from './ProductItem'

const Title = ({text1,text2}) => {
  return (
    <div className='inline-flex gap-1 items-center mb-3'>
        <p className='text-blue-500 font-light'>{text1}{' '} <span className='text-blue-700 font-normal'>{text2}</span></p>
        <p className='w-8 sm:w-12 h-[1px] sm:h-[1px]  bg-blue-800'></p>
    </div>
  )
}

export default Title
