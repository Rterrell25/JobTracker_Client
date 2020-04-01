import React, { useState } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '../components/Alert'
import Logo from '../components/SVGComponents/Logo'
import { NavLink } from 'react-router-dom'

// MUI stuff
import Link from '@material-ui/core/Link'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import CircularProgress from '@material-ui/core/CircularProgress'

const INITIAL_STATE = {
  email: ''
}

const useStyles = makeStyles(theme => ({
  form: {
    textAlign: 'center',
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    position: 'relative'
  },
  image: {
    margin: '20px auto 20px auto',
    marginBottom: 14
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    position: 'relative',
    borderRadius: 0,
    boxShadow: 'none',
    fontWeight: 'bold',
    color: 'white'
  },
  progress: {
    position: 'absolute'
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    width: '100%',
    position: 'absolute'
  },
  successAlert: {
    background: '#60C1E5'
  },
  warningAlert: {
    background: '#E10098'
  }
}))

const Reset = () => {
  const classes = useStyles()

  const [formData, setFormData] = useState(INITIAL_STATE)
  const [isloading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({})
  const [errors, setErrors] = useState({})
  const [open, setOpen] = React.useState(false)

  const isInvalid = !formData.email || isloading

  const handleInputChange = field => e =>
    setFormData({ ...formData, [field]: e.target.value })

  const handleSubmit = e => {
    setMessage('')
    setErrors('')
    e.preventDefault()
    setIsLoading(true)
    axios
      .post('/reset', formData)
      .then(res => {
        setOpen(true)
        setMessage(res.data)
        setIsLoading(false)
      })
      .catch(err => {
        setOpen(true)
        setErrors(err.response.data)
        const _TIMER = setTimeout(() => {
          setErrors('')
          clearTimeout(_TIMER)
        }, 5000)
        setIsLoading(false)
      })
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  return (
    <div style={{ marginTop: 70 }}>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <div className={classes.image}>
            <Logo svgHeight={170} height={'100%'} width={'100%'} />
          </div>
          <Typography variant="h4" className={classes.pageTitle}>
            Reset Password
          </Typography>
          <form noValidate className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              type="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus={true}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={formData.email}
              onChange={handleInputChange('email')}
            />

            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isInvalid}
              disableElevation
            >
              Reset Password
              {isloading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              style={{ top: 70 }}
              open={open}
              autoHideDuration={4000}
              onClose={handleClose}
            >
              {message.message ? (
                <Alert
                  onClose={handleClose}
                  severity="success"
                  className={classes.successAlert}
                >
                  {message.message}
                </Alert>
              ) : errors.error ? (
                <Alert
                  onClose={handleClose}
                  severity="error"
                  className={classes.warningAlert}
                >
                  {errors.error}
                </Alert>
              ) : (
                <div></div>
              )}
            </Snackbar>
            <Link component={NavLink} to="/login" variant="body2">
              Back to Login
            </Link>
          </form>
        </div>
      </Container>
    </div>
  )
}

export default Reset
