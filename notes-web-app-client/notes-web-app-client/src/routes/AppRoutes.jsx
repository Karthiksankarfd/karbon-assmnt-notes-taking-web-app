import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Profile from '../components/Profile'
import ProtectedRoute from '../components/ProtectedRoute'
import Index from '../components/UI/Index'
import Login from '../components/auth/Login'
import Notes from '../components/UI/Notes'
import SignUp from '../components/auth/SignUp'
import NotesPage from '../pages/NotesPage'
import AddNotesPage from '../pages/AddNotesPage'
import EditNote from '../pages/EditNote'



const AppRoutes = () => {
  return (
    <Routes>
         <Route path='/login' element={<Login/>}/>
         <Route path='/signup' element={<SignUp/>}/>
         <Route path='/' element = {<Index/>}>
                <Route index element ={<NotesPage/>} />
                <Route path='profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
                <Route path='addnotes' element ={<AddNotesPage/>} />
                <Route path= "editnote" element = {<EditNote/>}/>
         </Route>
    </Routes>
  )
}

export default AppRoutes
