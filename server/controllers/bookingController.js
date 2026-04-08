import transporter from "../config/nodemailer.js";
import Booking from "../models/booking.js";
import Room from "../models/Room.js";


export const  checkAvailability = async({ checkInDate, checkOutDate, room })=>{
  try{
    const bookings = await Booking.find({
        room,
        checkInDate: { $lt: new Date(checkOutDate) },
        checkOutDate: { $gt: new Date(checkInDate) },
        status: { $in: ["pending", "confirmed"] }
    });
    const isAvailable = bookings.length === 0;
    return isAvailable;

  }catch(error){
    console.error(error.message);
  }}


  //API to check availability of rooms
  // POST/api/bookings/check-availability

  export const checkAvailabilityAPI = async(requestAnimationFrame, res)=>{
    try{
        const {room, checkInDate, checkOutDate} = req.body;
        const isAvailable = await checkAvailability({room, checkInDate, checkOutDate});
        res.json({success: true, isAvailable})
    }catch(error){
        res.json({success: false, message:error.message})
    }
  }

  // API to create a  new booking
  // POST/api/bookings/create-booking

  export const createBooking = async(req , res)=>{
    try{
        const {room, checkInDate, checkOutDate, guests} = req.body;
        const user = req.user._id;

        const isAvailable = await checkAvailability({
            checkInDate,
            checkOutDate,
            room
        });

        if(!isAvailable){
            return res.json({success: false, message:"Room is not available for the selected dates"})
        }

        const roomData = await Room.findById(room).populate("hotel");
        let totalPrice = roomData.pricePerNight;

        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const timeDiff = Math.abs(checkOut.getTime() - checkIn.getTime());
        const numNights = Math.ceil(timeDiff / (1000 * 3600 * 24));
        totalPrice *= numNights;

        const booking = await Booking.create({
            user,
            room,
            hotel: roomData.hotel._id,
            guests: +guests,
            checkInDate,
            checkOutDate,
            totalPrice,
            
        });

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to:req.user.email,
            subject:"Hotel Booking Details",
            html:`
                <h2>Your Booking Details</h2>
                <p>Dear ${req.user.username}, </p>
                <p>Thank you for your booking! Here are your booking details:</p>
                <ul>
                    <li><strong>Booking ID:</strong> ${booking._id}</li>
                    <li><strong>Hotel Name:</strong> ${roomData.hotel.name}</li>
                    <li><strong>Location:</strong> ${roomData.hotel.address}</li>
                    <li><strong>Date:</strong> ${booking.checkInDate.toLocaleDateString()}</li>

                    <li><strong>Booking Amount:</strong> ${process.env.CURRENCY || '$'} ${booking.totalPrice.toFixed(2)}/night</li>
                    <p> We look forward to welcoming you!</p>
                    <p>If you need to make any changes, feel free to contact us.</p>
                
                `


        }

        await transporter.sendMail(mailOptions)

        res.json({success: true, message:"Booking created successfully", booking})
    }catch(error){
        console.log(error);
        res.json({success: false, message:"Failed to create booking"})
    }
  }

  // API to get all bookings for a user
  // GET/api/bookings/user-bookings

  export const getUserBookings = async(req , res)=>{
    try{
        const user = req.user._id;
        const bookins = await Booking.find({user}).populate("room hotel").sort({createdAt: -1})
        res.json({success: true, bookings}) 
    }catch(error){
        res.json({success:false, message:" Failed to fetch bookings"})
    }
  }

  export const getHotelBookings = async(req , res)=>{
    try{
        const hotel = await hotel.findOne({owner: req.auth.user._id});
    if(!hotel){
        return res.json({success: false, message:"No hotelfound"});

    }
    const bookings = (await Booking.find({hotel: hotel._id}).populate("room hotel user")).toSorted({createdAt: -1});

    const  totalBookings = bookings.length;

    const totalRevenue = bookings.reduce((acc, booking)=> acc + booking.totalPrice,
0)
    res.json({success: true, dashboardData: {totalBookings, totalRevenue, bookings}})
}
catch(error){
    res.json({success: false, message:"Failed to fetch bookings"})

}

  }