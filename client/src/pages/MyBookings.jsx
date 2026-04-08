import React, { useEffect, useState } from 'react'
import {Title} from '../components/Title' 
import {  assets } from '../assets/assets'
import { useAppContext } from '../hooks/useAppContext.js'
import toast from 'react-hot-toast'

const MyBookings = () => {
    const {axios, getToken, user} = useAppContext();
    const [bookings, setBookings] = useState([]);

    const fetchUserBookings = async()=>{
        try{
            const {data} = await axios.get('/api/bookings/user', {headers:{
                Authorization:`Bearer ${await getToken()}`
            }}) 
            if(data.success)
            {
                setBookings(data.bookings)
            }else{
                toast.error(data.message)
                
            }
        }catch(error){
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        if(user){
            fetchUserBookings();
        }
    },[user])



  return (
    <div className='px-4 md:px-16 lg:px-24 py-20'>
      <Title title='My Bookings' subTitle='Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks' align='left' />
      <div className='max-w-6xl mt-12 w-full text-gray-800'>
        <div className='hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3'>
            <div className='w-1/3'>Hotels</div>
            <div className='w-1/3'>Date & Timings</div>
            <div className='w-1/3'>Payment</div>

        </div>
        {bookings.map((booking)=>(
            <div key={booking._id} className='grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t'>
                <div className='flex flex-cols md:flex-row'>
                    <img src={booking.room.images[0]} alt="hotel-img" className='md:w-44 rounded shadow object-cover' />
                    <div className='flex flex-col gap-1.5 max-md:mt-3 md:ml-4'>
                        <p className='font-playfair text-2xl'>{booking.hotel.name}
                        <span className='font-inter text-sm'>({booking.room.roomType})</span>
                        </p>
                        <div className='flex items-center gap-1 text-sm text-gray-500'>
                            <img src={assets.locationIcon} alt="location-icon" />
                            <span >{booking.hotel.address}</span>

                        </div>
                        <div className='flex items-center gap-1 text-sm text-gray-500'>
                            <img src={assets.guestsIcon} alt="guest-icon" />
                            <span >{booking.guests}</span>

                    </div>
                    <p className='text-base'>Total: ${booking.totalPrice}</p>
                </div>
                </div>

                <div className='flex flex-row md:items-center md:gap-12 mt-3 gap-8'>
                    <div >
                        <p>
                            Check-In:
                        </p>
                        <p className='text-gray-500 text-sm'>
                            {new Date(booking.checkInDate).toDateString()}
                        </p>

                    </div>
                    <div>
                        <p>Check-Out:</p>
                        <p className='text-gray-500 text-sm'>
                            {new Date(booking.checkOutDate).toDateString()}
                        </p>

                    </div>

                </div>
                <div className='flex flex-col items-start justify-center pt-3'>
                    <div className='flex flex-col gap-2'>
                        <span className={`px-4 py-2 rounded-lg text-white text-sm font-semibold shadow-sm ${
                            booking.isPaid
                                ? "bg-gradient from-green-500 to-green-600"
                                : "bg-gradient from-amber-400 to-orange-500"
                        }`}>
                            {booking.isPaid ? "✓ Paid" : "⏳ Pending"}
                        </span>
                        {!booking.isPaid && (
                            <button className='px-6 py-2 text-sm font-medium border-2 border-amber-400 text-amber-600
                            rounded-lg hover:bg-amber-50 hover:border-amber-500 transition-all cursor-pointer shadow-sm'>
                                Pay Now
                            </button>
                        )}
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default MyBookings