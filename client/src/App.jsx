import React from 'react'
import Navbar from './components/Navbar.jsx'
import {Route,Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Footer from './components/Footer.jsx'
import AllRooms from './pages/AllRooms.jsx'
import RoomDetails from './pages/RoomDetails.jsx'
import MyBookings from './pages/MyBookings.jsx'
import HotelReg from './components/HotelReg.jsx'
import LayOut from './pages/HotelOwner/LayOut.jsx'
// import { useLocation } from 'react-router-dom'
import Dashboard from './pages/HotelOwner/DashBoard.jsx'
import AddRoom from './pages/HotelOwner/AddRoom.jsx'
import ListRoom from './pages/HotelOwner/ListRoom.jsx'
import {Toaster} from "react-hot-toast"
import { useAppContext } from './hooks/useAppContext.js'







const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner")
  const {showHotelReg} = useAppContext();

  return (
    <div>
      <Toaster />
      {!isOwnerPath && <Navbar />}
      {showHotelReg && <HotelReg />}
      
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/rooms' element={<AllRooms/>}/>
          <Route path='/rooms/:id' element={<RoomDetails/>}/>
          <Route path='/my-bookings' element={<MyBookings />}/>
          {/* <Route path='/owner' element={<HotelReg />}/> */}
          <Route path='/owner' element={<LayOut/>}>
                 <Route index element={<Dashboard />}/>
                 <Route path="add-room" element={<AddRoom />}/>
                 <Route path="list-room" element={<ListRoom />}/>

          </Route>

        </Routes>


      </div>
      <Footer/>

    </div>
  )
}

export default App