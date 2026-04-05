import express from 'express';
import { checkAvailabilityAPI, createBooking ,getHotelBookings, getUserBookings} from '../controllers/bookingController';
import { Protect } from '../middleware/authMiddleware.js';

const bookingRouter = express.Router();

bookingRouter.post('/check-availability', checkAvailabilityAPI);
bookingRouter.post('/book', Protect, createBooking);
bookingRouter.get('/user', Protect, getUserBookings);
bookingRouter.get('/hotel', Protect, getHotelBookings);



export default bookingRouter;