import { createMuiTheme } from '@material-ui/core/styles'

const Raleway = {
  fontFamily: 'Raleway, sans-serif'
}

const theme = createMuiTheme({
  palette: {
    // COMMENTS LEFT IN TO SHOW HOW TO EDIT THEME COLORS
    type: 'dark',
    background: {
      paper: '#15202B',
      default: '#11171F'
    },
    // text: {
    //   primary: BLACK,
    //   secondary: DARK_GREY
    // },
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#60C1E5'
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#E10098'
      // dark: will be calculated from palette.secondary.main,
    }
  },
  typography: {
    h1: {
      ...Raleway
    },
    h2: {
      ...Raleway
    },
    h3: {
      ...Raleway
    },
    h4: {
      ...Raleway
    },
    h5: {
      ...Raleway
    },
    h6: {
      ...Raleway
    },
    body1: {
      ...Raleway
    },
    body2: {
      ...Raleway
    },
    subtitle1: {
      ...Raleway
    }
  }
})
export default theme
