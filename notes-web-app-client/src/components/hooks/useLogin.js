import axios from 'axios'
import React, { useContext } from 'react'
import { UserContext } from '../../contex/UserContext'
import { toast } from 'react-toastify'
import { AuthContext } from '../../contex/AuthContext'
import { useNavigate } from 'react-router-dom'

const baseURL = import.meta.env.VITE_BASE_API_END_POINT


const useLogin = () => {
  
  const {  setLoggedIn } = useContext(AuthContext)
  const { setUser }      = useContext (UserContext)
  const navigateTo = useNavigate()

  const standardLogin = async (formData) => {

  const loadingToast = toast.loading("Logging in...Please wait...");

  try {
    const res = await axios.post(`${baseURL}/auth/login`, formData);

      if (res.status !== 200) {
        throw new Error(res.data.message || "Login failed");
      }

      toast.update(loadingToast, {
        render: "Login successful!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      localStorage.setItem("notesapptoken" , res.data.token)
      setUser(res.data.user);
      setLoggedIn(true)
      navigateTo("/")

  } catch (e) {
      toast.update(loadingToast, {
        render: e?.response?.data?.message || "Login failed",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });

    console.log("Error in email login:", e.message);
    
  }
  }


  const googleLogin = async (formData) => {
    try {
      const res = await axios.post(`${baseURL}/google-login`, { formData })
      console.log(res.data)
      return res.data
    } catch (e) {
      console.log("error in email login", e.message)
    }
  }
  return { standardLogin, googleLogin }
}

export default useLogin
