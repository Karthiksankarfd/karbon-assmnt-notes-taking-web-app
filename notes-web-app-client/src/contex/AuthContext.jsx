import React, { Children, useState } from 'react'
import { createContext } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext()
const AuthContextProvider = ({children}) => {

  const[IsLoggedIn , setLoggedIn] = useState()
    const[isVerfied , setIsVerfied ] = useState(false)
  return (
    <AuthContext.Provider value={{IsLoggedIn , setLoggedIn, isVerfied , setIsVerfied}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
