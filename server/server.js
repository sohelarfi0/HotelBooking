import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import connectDB from './config/db.js';
import {clerkMiddleware} from "@clerk/express";
import clerkWebhooks from './controllers/clerkWebhooks.js';
import userRouter from './routes/userRoutes.js'; 
import connectCloudinary from './config/cloudinary.js';
import roomRouter from './routes/roomRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';
import hotelRouter from './routes/hotelRoute.js';





connectDB();
connectCloudinary();

const app = express()
app.use(cors()) //enable cross-origin resources

// Middlewares
app.use(express.json())
app.use(clerkMiddleware())

// API to listen to Clerk Webhooks
app.use('/api/clerk', clerkWebhooks)

app.get('/', (req, res)=> res.send("API is working"))
app.use('/api/user', userRouter)
app.use('/api/rooms', roomRouter)
app.use('/api/bookings', bookingRouter)
app.use('/api/hotels', hotelRouter)


const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.group(`Server running on port ${PORT}`))