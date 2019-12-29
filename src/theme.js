import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FFCD02"
    },
    secondary: {
      main: "#0F28A9"
    },
    error: {
      main: red.A400
    },
    background: {
      default: "#fff"
    }
  }
});

export default theme;
