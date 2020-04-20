import React, { useState, createContext } from 'react'

export const RememberContext = createContext()

const initialRemember = localStorage.Remember
  ? JSON.parse(localStorage.Remember)
  : false
export const RememberProvider = props => {
  const [remember, setRemember] = useState(initialRemember)

  return (
    <RememberContext.Provider value={{ remember, setRemember }}>
      {props.children}
    </RememberContext.Provider>
  )
}
