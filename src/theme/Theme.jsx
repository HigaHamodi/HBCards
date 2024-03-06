import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#009688",
      light: "#4DB6AC",
      dark: "#00796B",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FF7043",
      light: "#FFAB91",
      dark: "#F4511E",
      contrastText: "#000000",
    },
    error: {
      main: "#D32F2F",
      light: "#EF5350",
      dark: "#C62828",
      contrastText: "#FFFFFF",
    },
    warning: {
      main: "#FFA000",
      light: "#FFC107",
      dark: "#FF8F00",
      contrastText: "#000000",
    },
    info: {
      main: "#29B6F6",
      light: "#4FC3F7",
      dark: "#0288D1",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#66BB6A",
      light: "#81C784",
      dark: "#388E3C",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F5F5F5",
      paper: "#E8F5E9",
    },
    text: {
      primary: "#212121",
    },
    divider: "#BDBDBD",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: "#00BCD4",
      main: "#00BCD4",
      dark: "#212121",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#8BC34A",
      main: "#8BC34A",
      dark: "#4D4D4D",
      contrastText: "#ffffff",
    },
    error: {
      light: "#D84031",
      main: "#D84031",
      dark: "#B71C1C",
      contrastText: "#ffffff",
    },
    warning: {
      light: "#FF9800",
      main: "#FF9800",
      dark: "#E6824B",
      contrastText: "#ffffff",
    },
    background: {
      default: "#212121",
      paper: "#303030",
    },
    text: {
      primary: "#ffffff",
      secondary: "#888888",
      disabled: "#666666",
    },
  },
});

export { lightTheme, darkTheme };
