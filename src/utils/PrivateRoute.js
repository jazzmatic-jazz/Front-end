import { Route, Redirect, Routes, Navigate, Outlet } from "react-router-dom";
import React, { useContext } from 'react'
import AuthContext from "../context/AuthContext";

const PrivateRoute = () => {

    let {user} = useContext(AuthContext)
    // const authenticated = false
    return (
      user ? <Outlet/> : <Navigate to='/login'/>
  )
}

export default PrivateRoute