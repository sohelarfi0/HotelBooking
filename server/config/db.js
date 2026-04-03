import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        mongoose.connection.on('connected', ()=> console.log('Database connected successfully'));

        await mongoose.connect(`${process.env.MONGODB_URI}/hotel-booking`)


    } catch (console){
        console.log(console.message);
 

    }

}


export default connectDB;