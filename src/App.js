import React, { useEffect, useContext, useReducer } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import UserContext from './contexts/UserContext'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

// MUI stuff
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles/'
import CssBaseline from '@material-ui/core/CssBaseline'

// utils
import reducer from './utils/reducer'
import lightTheme from './utils/lightTheme'
import darkTheme from './utils/darkTheme'
import AuthRoute from './utils/AuthRoute'
import UnAuthRoute from './utils/UnAuthRoute'
import AdminRoute from './utils/AdminRoute'

// Components
import NavBar from './components/NavBar'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'
import Admin from './pages/Admin'
import Dashboard from './pages/Dashboard'
import Alumni from './pages/Alumni'
import Reset from './pages/Reset'

// context
import { ProfileContext } from './contexts/ProfileContext'
import { ThemeContext } from './contexts/ThemeContext'

axios.defaults.baseURL = `https://us-central1-jobtracker-4f14f.cloudfunctions.net/api`

const fetchProfile = (token) => {
  return axios.get(`/user`, {
    headers: {
      Authorization: `${token}`
    }
  })
}

const App = () => {
  const initialState = useContext(UserContext)
  const { user, setUser } = useContext(ProfileContext)
  const { isDarkTheme } = useContext(ThemeContext)
  const [state, dispatch] = useReducer(reducer, initialState)
  const theme = createMuiTheme(isDarkTheme ? darkTheme : lightTheme)

  // keeps userContext authorized if signed in
  useEffect(
    (_) => {
      const token = localStorage.FBIdToken
      if (token && token !== 'Bearer undefined') {
        const decodedToken = jwtDecode(token)
        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem('FBIdToken')
          dispatch({ type: 'LOGOUT' })
        } else {
          dispatch({ type: 'LOGIN' })
          if (state.isAuth) {
            fetchProfile(token)
              .then((res) => setUser(res.data))
              .catch((error) => console.error(error))
          }
        }
      } else {
        dispatch({ type: 'LOGOUT' })
        localStorage.removeItem('FBIdToken')
      }
    },
    [state.isAuth, setUser]
  )

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <UserContext.Provider value={{ state, dispatch }}>
        <div className="App">
          <Router>
            <NavBar isAuth={state.isAuth} />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <UnAuthRoute
                  path="/signup"
                  component={SignUp}
                  isAuth={state.isAuth}
                />
                <UnAuthRoute
                  path="/login"
                  component={Login}
                  isAuth={state.isAuth}
                />
                <UnAuthRoute
                  path="/reset"
                  component={Reset}
                  isAuth={state.isAuth}
                />
                <AuthRoute
                  path="/profile"
                  component={Profile}
                  isAuth={state.isAuth}
                />
                <AuthRoute
                  path="/dashboard"
                  component={Dashboard}
                  isAuth={state.isAuth}
                />
                <AdminRoute
                  path="/admin"
                  component={Admin}
                  isAuth={state.isAuth}
                  user={user}
                />
                <AuthRoute
                  path="/users/:id"
                  component={Alumni}
                  isAuth={state.isAuth}
                />
              </Switch>
            </div>
          </Router>
        </div>
      </UserContext.Provider>
    </MuiThemeProvider>
  )
}

export default App
