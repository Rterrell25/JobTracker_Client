import { makeStyles } from '@material-ui/core/styles'
export default makeStyles(theme => ({
  card: {
    display: 'flex',
    marginBottom: 10,
    minHeight: 90
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between'
  },
  alumniCardContent: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    '@media (max-width: 600px)': {
      flexDirection: 'column'
    }
  },
  alumniCardHeader: {
    '@media (max-width: 600px)': {
      marginRight: 'auto',
      marginBottom: 5
    }
  },
  button: {
    padding: '0 4px',
    border: '0',
    background: 'transparent',
    color: theme.palette.text.primary,
    position: 'relative'
  },
  timeStamp: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  jobField: {
    margin: 0,
    padding: 0
  },
  grid: {
    padding: 0
  },
  submit: {
    position: 'relative',
    borderRadius: 0,
    boxShadow: 'none',
    fontWeight: 'bold',
    color: 'white'
  },
  progress: {
    position: 'absolute'
  },
  deleteProgress: {
    // These values need to change with the size of the progress
    // 0,0,0,0, if button size === progress size, else, adjust
    position: 'absolute',
    bottom: 0,
    top: -2,
    right: 10,
    left: 1
  },
  alumniCard: {
    display: 'flex',
    marginBottom: 20,
    minHeight: '140px',
    '@media (max-width: 600px)': {
      flexDirection: 'column'
    }
  },
  alumniChips: {
    width: '100%',
    display: 'flex',
    marginLeft: 'auto'
  },
  image: {
    width: 150,
    height: 140,
    objectFit: 'cover',
    '@media (max-width: 600px)': {
      width: '100%'
    }
  },
  marginBottom: {
    margin: '2% 0'
  },
  jobTitle: {
    textAlign: 'center'
  },
  progressThree: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '40%'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 10px'
  },
  successAlert: {
    background: '#60C1E5'
  },
  warningAlert: {
    background: '#E10098'
  },
  dashboardContainer: {
    marginTop: 70,
    padding: 10
  },
  fabButton: {
    position: 'fixed',
    right: 25,
    bottom: 25,
    zIndex: 5
  },
  fabAddIcon: {
    color: theme.palette.background.paper
  }
}))
