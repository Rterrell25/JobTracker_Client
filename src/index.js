import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'

import { ProfileProvider } from './contexts/ProfileContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { RememberProvider } from './contexts/RememberContext'

ReactDOM.render(
  <ProfileProvider>
    <RememberProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </RememberProvider>
  </ProfileProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
