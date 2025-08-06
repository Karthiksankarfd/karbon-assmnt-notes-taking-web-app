import React, { useState } from 'react'
import { AuthContext } from '../../contex/AuthContext';
import useLogin from '../hooks/useLogin';
import { UserContext } from '../../contex/UserContext';
import { Link} from 'react-router-dom';
import GoogleOauth from './GoogleOauth';
import { toast } from 'react-toastify';

const Login = () => {
    const { standardLogin } =  useLogin()
      const [showPassword, setShowPassword] = useState(false); 
    const [formData , setFormData] = useState({
        loginType:"standard",
        name:"" ,
        email:"" ,
        password:""
    })
    
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

      const toastOptions = {
        duration: 3000,
        autoClose: 3000,
        pauseOnHover: true
      };


    const handleFormChange =(e)=>{
      setFormData({...formData , [e.target.name]:e.target.value})
    }

    const handleFormSubmit = async (e)=>{
        e.preventDefault()

            // Validation checks
            if (!emailRegex.test(formData.email.trim())) {
              toast.error("Please enter a valid email address.", {
                toastId: "email",
                ...toastOptions
              });
              return;
            }
        
            if (!passwordRegex.test(formData.password.trim())) {
              toast.error("Password must be at least 8 characters and include letters and numbers.", {
                toastId: "Password",
                ...toastOptions
              });
              return;
            }
        await standardLogin(formData)
    }

  return (
<section className="w-full h-dvh bg-white/10 flex items-center justify-center p-5">
  <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <h1 className="text-2xl font-semibold text-blue-600 text-center">Login</h1>

      <div className="flex flex-col">
        <label htmlFor="email" className="mb-1 font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          name="email"
          onChange={handleFormChange}
          required
          className="p-2 border border-gray-300 rounded-lg focus:outline-blue-400"
        />
      </div>

            <div className='relative'>
              <input
                minLength={8}
                type={showPassword ? "text" : "password"} 
                name="password"
                onChange={handleFormChange}
                required
                className="p-2 border border-gray-300 rounded-lg focus:outline-blue-400 w-full pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)} 
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-blue-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md"
      >
        Login
      </button>
    </form>
      <div className='flex items-center '>
         <div className='flex-1 h-[1px]  bg-gray-500'></div> <span className='text-lg px-2'>or</span><div className='flex-1 h-[1px]  bg-gray-500'></div>
      </div>
      <div className='flex justify-center'>
          <h3 className='text-center mr-auto'>Sign in with Google</h3> <span>|</span> <Link className='ml-auto text-blue-500 underline' to="/signup">New user? Sign Up</Link>
      </div>
      
    {/* Google OAuth Section */}
    <div className="mt-6 flex justify-center">
      <GoogleOauth />
    </div>
  </div>
</section>
  )
}

export default Login
