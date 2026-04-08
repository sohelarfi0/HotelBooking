import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        console.log('MONGODB_URI:', process.env.MONGODB_URI);
        mongoose.connection.on('connected', ()=> console.log('Database connected successfully'));

        await mongoose.connect(process.env.MONGODB_URI)


    } catch (error){
        console.log(error.message);
 

    }

}


export default connectDB;