import { createMuiTheme, colors } from "@material-ui/core";
export default createMuiTheme({
    palette: {
        background: {
          dark: '#FFF',
          default: colors.common.white,
          paper: colors.common.white
        },
        primary: {
          main: colors.blue['A700']
        },
        secondary: {
          main: colors.orange[500]
        },
        text: {
          primary: colors.blueGrey[900],
          secondary: colors.blueGrey[600],
          logo : colors.common.white,
        }
      },   
});