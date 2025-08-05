import axios from 'axios';
import React, { useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contex/AuthContext';
import { toast } from 'react-toastify';
import { UserContext } from '../../contex/UserContext';

const GoogleOauth = () => {

    const baseURL = import.meta.env.VITE_BASE_API_END_POINT;
    const googleButtonRef = useRef(null);
    const navigateTo = useNavigate();
    
    const { setUser } = useContext(UserContext)
    const { setLoggedIn }  = useContext(AuthContext)

    useEffect(() => {
        // Load the script dynamically
        const script = document.createElement("script");
        script.src = import.meta.env.VITE_GOOGLE_OAUTH_SCRIPT;
        script.async = true;
        script.defer = true;
        script.onload = initializeGoogleSignIn;
        document.body.appendChild(script);
    }, []);


    function initializeGoogleSignIn() {
        if (window.google && googleButtonRef.current) {
        window.google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse,
        });

        window.google.accounts.id.renderButton(googleButtonRef.current, {
            theme: "outline",
            size: "large",
            text: "signin_with",
            width: "300",
        });
        // Optionally, prompt Google One Tap login
        // window.google.accounts.id.prompt();
        }

    }

   async function handleCredentialResponse(response) {
        // console.log("Encoded JWT ID token:", response.credential);
        // const payload = JSON.parse(atob(response.credential.split(".")[1]));
        // console.log("User Info:", payload);
        let loadingToast = toast("Logging in")
        try
        {
            const res = await axios.post(
                `${baseURL}/auth/google-login`,
                {}, 
                {
                    headers: {
                    Authorization: `Bearer ${response.credential}`,
                    },
                }
                );
            console.log(res.data)
            toast.update(loadingToast,{
                      render: "Login successful!",
                      type: "success",
                      isLoading: false,
                      autoClose: 3000,
            } )
            setUser(res.data.user)
            setLoggedIn(true)
            navigateTo("/")
        }
        catch(e)
        {
                toast.update(loadingToast, {
                render: e.message || "Login failed... please try again",
                type: "error",
                isLoading: false,
                autoClose: 3000,
                });
                console.log(e)
        }
    }
  return (
    <div className='mx-auto' ref={googleButtonRef}></div>
  )
}

export default GoogleOauth
