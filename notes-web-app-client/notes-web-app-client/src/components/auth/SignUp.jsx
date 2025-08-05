import React, { useState } from 'react'
import { AuthContext } from '../../contex/AuthContext';
import { UserContext } from '../../contex/UserContext';
import GoogleOauth from './GoogleOauth';
import useSignUp from '../hooks/useSignUp';

const SignUp = () => {

  
    const { signUp , loading }  = useSignUp()
    // const{ standardLogin } = useLogin()
   
    const [formData , setFormData] = useState({
        loginType:"standard",
        name:"" ,
        email:"" ,
        password:""
    })

    const handleFormChange =(e)=>{
      e.preventDefault()
      setFormData({...formData , [e.target.name]:e.target.value})
    }

    const handleFormSubmit = async (e)=>{
            e.preventDefault()
            signUp(formData)
    }

  return (
<section className="w-full h-dvh bg-white/10 flex items-center justify-center p-5">
  <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <h1 className="text-2xl font-semibold text-blue-600 text-center">Sign Up</h1>

      <div className="flex flex-col">
        <label htmlFor="name" className="mb-1 font-medium text-gray-700">User Name</label>
        <input
          type="text"
          name="name"
          onChange={handleFormChange}
          required
          className="p-2 border border-gray-300 rounded-lg focus:outline-blue-400"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="email" className="mb-1 font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          onChange={handleFormChange}
          required
          className="p-2 border border-gray-300 rounded-lg focus:outline-blue-400"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="password" className="mb-1 font-medium text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          onChange={handleFormChange}
          required
          className="p-2 border border-gray-300 rounded-lg focus:outline-blue-400"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md"
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
      <div className='flex items-center '>
         <div className='flex-1 h-[1px]  bg-gray-500'></div> <span className='text-lg px-2'>or</span><div className='flex-1 h-[1px]  bg-gray-500'></div>
      </div>
      <h3 className='text-center'>Sign Up with Google</h3>
    {/* Google OAuth */}
    <div className="mt-6 flex justify-center">
      <GoogleOauth />
    </div>
  </div>
</section>

  )
}

export default SignUp
