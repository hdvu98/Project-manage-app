import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Quicksand", sans-serif',
  },
  palette: {
    primary: {
      main: "#00b894",
      light: "#55efc4",
      contrastText: "#fff",
    },
  },
});

export { theme };
