import { createMuiTheme, colors } from "@material-ui/core";
export default createMuiTheme({
    palette: {
        background: {
          dark: '#FFF',
          default: colors.common.white,
          paper: colors.common.white
        },
        primary: {
          main: "#0d47a1"
        },
        secondary: {
          main: "#28a745"
        },
        text: {
          primary: colors.blueGrey[900],
          secondary: colors.blueGrey[600],
          logo : colors.common.white,
        },
      },   
});