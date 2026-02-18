import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Home from '../pages/Home'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import MovieDetail from '../pages/MovieDetail'
import Profile from '../pages/Profile'


const AppRouter = () => {
  return (
    <>
        <div className='min-h-screen bg-linear-to-br from-orange-50 via-white to-teal-50'>
          <Navbar />
           <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/movie/:id' element={<MovieDetail />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/profile' element={<Profile />} />
           </Routes>
        </div>
    </>
  )
}

export default AppRouter