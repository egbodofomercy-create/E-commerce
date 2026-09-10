import React from 'react'

const Title = ({ text1, text2, black = false }) => {
  return (
    <div className='inline-flex gap-1 items-center mb-3'>
      <p className={`font-light ${black ? 'text-black' : 'text-blue-500'}`}>
        {text1}{' '}
        <span className={`font-normal ${black ? 'text-black' : 'text-blue-700'}`}>
          {text2}
        </span>
      </p>

      <p
        className={`w-8 sm:w-12 h-[1px] sm:h-[1px] ${
          black ? 'bg-black' : 'bg-blue-800'
        }`}
      ></p>
    </div>
  )
}

export default Title
