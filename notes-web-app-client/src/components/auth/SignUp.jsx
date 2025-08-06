import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import GoogleOauth from './GoogleOauth';
import useSignUp from '../hooks/useSignUp';

const SignUp = () => {
  const { signUp, loading } = useSignUp();

  const [formData, setFormData] = useState({
    loginType: "standard",
    name: "",
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const usernameRegex = /^[a-zA-Z0-9]{3,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const toastOptions = {
    duration: 3000,
    autoClose: 3000,
    pauseOnHover: true
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!usernameRegex.test(formData.name.trim())) {
      toast.error("Username must be at least 3 characters with letters/numbers only.", {
        toastId: "name",
        ...toastOptions
      });
      return;
    }

    if (!emailRegex.test(formData.email.trim())) {
      toast.error("Please enter a valid email address.", {
        toastId: "email",
        ...toastOptions
      });
      return;
    }

    if (!passwordRegex.test(formData.password)) {
      toast.error("Password must be at least 8 characters and include letters and numbers.", {
        toastId: "password",
        ...toastOptions
      });
      return;
    }

    await signUp(formData)

  
  };

  return (
    <section className="w-full h-dvh bg-white/10 flex items-center justify-center p-5">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <form onSubmit={handleFormSubmit} className="space-y-4 w-full">
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

          <div className="flex flex-col w-full">
            <label htmlFor="password" className="mb-1 font-medium text-gray-700">Password</label>
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
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <div className='flex items-center my-4'>
          <div className='flex-1 h-[1px] bg-gray-500'></div>
          <span className='text-lg px-2'>or</span>
          <div className='flex-1 h-[1px] bg-gray-500'></div>
        </div>

        <div className='flex justify-center mb-2'>
          <h3 className='text-center mr-auto'>Sign up with Google</h3>
          <span>|</span>
          <Link className='ml-auto text-blue-500 underline' to="/login">Already a user? Log in</Link>
        </div>

        <div className="mt-6 flex justify-center">
          <GoogleOauth />
        </div>
      </div>
    </section>
  );
};

export default SignUp;
