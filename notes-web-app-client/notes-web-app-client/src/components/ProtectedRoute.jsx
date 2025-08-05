import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contex/AuthContext'

const ProtectedRoute = ({children}) => {
  
  const {IsLoggedIn} =  useContext(AuthContext)
// const IsLoggedIn  = true
  const navigateTo =  useNavigate()

  if(!IsLoggedIn){
       navigateTo("/login")
       return ;
  }

  return children
}

export default ProtectedRoute
