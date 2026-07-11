import React, { useContext } from 'react'
import { AuthKontext } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRouter = () => {

  const {currentUser}=useContext(AuthKontext)
  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRouter