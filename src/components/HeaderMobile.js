import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'

// MUI STUFF
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import PersonIcon from '@material-ui/icons/Person'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import DashboardIcon from '@material-ui/icons/Dashboard'
import Avatar from '@material-ui/core/Avatar'
import ThinLogo from './SVGComponents/ThinLogo'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import DarkModeIcon from '@material-ui/icons/Brightness4'
import LightModeIcon from '@material-ui/icons/Brightness7'

// context
import { ProfileContext } from '../contexts/ProfileContext'
import { ThemeContext } from '../contexts/ThemeContext'

const useStyles = makeStyles(theme => ({
  navList: {
    width: 280,
    flexGrow: 1,
    position: 'relative'
  },
  fullList: {
    width: 'auto'
  },
  logout: {
    fontWeight: 'bold',
    color: 'white',
    borderRadius: 0,
    boxShadow: 'none',
    textTransform: 'uppercase'
  },
  spreadLogout: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  navImage: {
    width: '100%'
  }
}))
const HeaderMobile = ({ isAuth, logout }) => {
  const classes = useStyles()
  const { user } = useContext(ProfileContext)
  const { isDarkTheme, setIsDarkTheme } = useContext(ThemeContext)
  const [isOpen, setIsOpen] = useState(false)
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)
  const toggleDrawer = event => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }
    setIsOpen(!isOpen)
  }

  const handleThemeChange = () => {
    localStorage.setItem('prefersDarkTheme', `${!isDarkTheme}`)
    setIsDarkTheme(prevState => !prevState)
  }

  return (
    <>
      <Grid container justify="space-between" alignItems="center">
        <Grid item xs={2}>
          <IconButton
            onClick={toggleDrawer}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
        </Grid>
        <Grid item xs={10} container justify="flex-end">
          <Button color="inherit" component={Link} to="/">
            <Typography variant="h6">Jobtracker</Typography>
          </Button>
        </Grid>
      </Grid>
      <SwipeableDrawer
        open={isOpen}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
      >
        <List
          className={classes.navList}
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <ListItem button component={Link} to="/">
            <ThinLogo svgHeight={70} />
          </ListItem>
          <Divider />
          {isAuth ? (
            <>
              {user && (
                <ListItem button component={Link} to="/profile">
                  <ListItemIcon>
                    <Avatar
                      alt={user.user.firstName + user.user.lastName}
                      src={user.user.imageUrl}
                    />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body1">
                      {user.user.firstName} {user.user.lastName}
                    </Typography>
                    <Typography variant="body2">{user.user.email}</Typography>
                  </ListItemText>
                </ListItem>
              )}
              <Divider />
              <ListItem button component={Link} to="/profile">
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
              <ListItem button component={Link} to="/dashboard">
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
              {user && user.user.admin && (
                <ListItem button component={Link} to="/admin">
                  <ListItemIcon>
                    <SupervisorAccountIcon />
                  </ListItemIcon>
                  <ListItemText primary="Admin" />
                </ListItem>
              )}
              <Divider />
              <ListItem onClick={handleThemeChange}>
                <ListItemIcon>
                  {isDarkTheme ? <LightModeIcon /> : <DarkModeIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={isDarkTheme ? 'Set Light' : 'Set Dark'}
                />
              </ListItem>
              <ListItem style={{ bottom: 0, position: 'absolute' }}>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={logout}
                  className={classes.logout}
                >
                  Logout
                  <ExitToAppIcon />
                </Button>
              </ListItem>
            </>
          ) : (
            <>
              <ListItem button component={Link} to="/login">
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItem>
              <ListItem button component={Link} to="/signup">
                <ListItemIcon>
                  <PersonAddIcon />
                </ListItemIcon>
                <ListItemText primary="Sign Up" />
              </ListItem>
              <Divider />
              <ListItem onClick={handleThemeChange}>
                <ListItemIcon>
                  {isDarkTheme ? <LightModeIcon /> : <DarkModeIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={isDarkTheme ? 'Set Light' : 'Set Dark'}
                />
              </ListItem>
            </>
          )}
        </List>
      </SwipeableDrawer>
    </>
  )
}
export default HeaderMobile
