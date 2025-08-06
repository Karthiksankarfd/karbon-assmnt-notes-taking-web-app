import React, { useContext } from 'react'
import { UserContext } from '../../contex/UserContext'
import { AuthContext } from '../../contex/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const useAutoLogin = () => {

  const baseURL         = import.meta.env.VITE_BASE_API_END_POINT
  const { setUser }     = useContext(UserContext)
  const { setLoggedIn } = useContext(AuthContext)
  const  navigateTo     = useNavigate()

  const getToken = async () =>{

        const token = localStorage.getItem("notesapptoken")

        if(!token){
            navigateTo("/login")
            return;
        }
        
        const loadingToast = toast.loading("Loading...");
        
        try{
            const res = await axios.get(`${baseURL}/auth/verify-token`  , {headers :{
                    Authorization : `Bearer ${token}`
            }})

            console.log(res.data.user)
            setLoggedIn(true)
            setUser(res.data.user)
            toast.update(loadingToast, {
              render: "profile Loaded successful!",
              type: "success",
              isLoading: false,
              autoClose: 3000,
            });
        }catch(e){
            toast.update(loadingToast, {
              render: res.e.message || "Session Expired",
              type: "error",
              isLoading: false,
              autoClose: 3000,
            });
            navigateTo("/login")
            console.log("error", e.message)
        }

  }
  return {getToken}
}

export default useAutoLogin
