import React, { useState, createContext } from 'react'

export const ThemeContext = createContext()

const initialTheme = JSON.parse(localStorage.prefersDarkTheme) || false
export const ThemeProvider = props => {
  const [isDarkTheme, setIsDarkTheme] = useState(initialTheme)

  return (
    <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
      {props.children}
    </ThemeContext.Provider>
  )
}
