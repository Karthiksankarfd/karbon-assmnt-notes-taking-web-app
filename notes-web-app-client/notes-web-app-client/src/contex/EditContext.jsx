import React, { createContext, useState } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const EditNoteContext = createContext()
const EditContextProvider = ({children}) => {
    const [editNote , setEditNote] = useState(null)
  return (
    <EditNoteContext.Provider value={{editNote , setEditNote}}>
      {children}
    </EditNoteContext.Provider>
  )
}

export default EditContextProvider
