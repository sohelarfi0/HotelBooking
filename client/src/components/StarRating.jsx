import React from 'react'
import {assets} from '../assets/assets'

const StarRating = ({ rating = 4 }) => {
  return (
    <>
      {Array.from({ length: 5 }, (_, index) => (
        <img
          key={index}
          src={index < rating ? assets.starIconFilled : assets.starIconOutlined}
          alt={index < rating ? 'filled-star-icon' : 'outlined-star-icon'}
          className='w-4.5 h-4.5'
        />
      ))}
    </>
  )
}

export default StarRating