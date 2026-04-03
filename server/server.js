import express from 'express'
import cors from 'cors'
import "dotenv/config";
// import cors from "cors";
import connectDB from './config/db.js';
import {clerkMiddleware} from "@clerk/express";
import clerkWebhooks from './controllers/clerkWebhooks.js';



connectDB();

const app = express()
app.use(cors()) //enable cross-origin resources

// Middlewares
app.use(express.json())
app.use(clerkMiddleware())

// API to listen to Clerk Webhooks
app.use('/api/clerk', clerkWebhooks)

app.get('/', (req, res)=> res.send("API is working"))

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.group(`Server running on port ${PORT}`))