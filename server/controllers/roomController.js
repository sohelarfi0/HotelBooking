
// Api to create a new room for a hotel. Only hotel owners can create rooms for their hotels.

import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

export const createRoom = async (req , res)=>{
    try{
        const { roomType, pricePerNight, amenities, images } = req.body;
        const hotel = await Hotel.findOne({owner: req.user._id});
        if(!hotel){
            return res.json({success: false, message:"Hotel not found"})
        }

    }catch(error){
        
    }
}


// API to get all rooms

export const getRooms = async (req , res)=>{

}

// API to  get all rooms for a specific hotel
export const getOwnerRooms = async (req , res)=>{

}

// API to toggles availability of a room

export const toggleRoomAvailability = async (req , res)=>{

}



