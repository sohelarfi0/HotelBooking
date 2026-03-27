import React from 'react'
import { assets } from '../assets/assets'
import { Title } from './Title'

const NewsLetter = () => {
  return (
    
    <div class="flex flex-col items-center
     max-w-5xl lg:w-full rounded-2xl px-4 py-12 md:py-16 mx-2 lg:mx-auto my-30 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border border-gray-100 shadow-lg">
    
    <Title title="Stay Ahead of the Journey" subTitle="Join our exclusive newsletter and unlock a world of premium travel experiences. Be the first to know about hidden gems, exclusive deals, and personalized recommendations tailored just for you." />
     
    <div class="flex flex-col justify-center items-center text-center">
    
    <div class="flex flex-col md:flex-row items-center justify-center
     gap-4 mt-6">


        <input type="text" class="bg-white/80 backdrop-blur-sm px-4 py-2.5 border border-gray-200 rounded-lg 
        outline-none max-w-66 w-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter your email"/>
            <button class="flex items-center justify-center gap-2 
            group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-4 md:px-7 py-2.5 rounded-lg active:scale-95 transition-all shadow-md text-white">
            Subscribe
            <img src={assets.arrowIcon} alt="arrow-icon" className='w-3.5 invert 
            group-hover:translate-x-1 transition-all' />
            
            </button>
    </div>
    <p class="text-gray-600 mt-6 text-xs
     text-center">By subscribing, you agree to our Privacy
      Policy and consent to receive updates.</p>

</div>
</div>

  
)}

export default NewsLetter