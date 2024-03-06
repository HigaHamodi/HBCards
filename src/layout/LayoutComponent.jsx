import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import HeaderComponent from "./header/HeaderComponent";
import MainComponent from "./main/MainComponent";
import FooterComponent from "./footer/FooterComponent";
import { useDispatch, useSelector } from "react-redux";
import { darkThemeActions } from "../store/darkThemeSlice";
import { Box } from "@mui/material";
import { darkTheme, lightTheme } from "../theme/Theme";

const LayoutComponent = ({ children }) => {
  const isDarkTheme = useSelector((store) => store.darkThemeSlice.darkTheme);
  const dispatch = useDispatch();

  const handleThemeChange = () => {
    dispatch(darkThemeActions.changeTheme());
  };

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box style={{ display: "flex", flexDirection: "column" }}>
        <HeaderComponent
          isDarkTheme={isDarkTheme}
          onThemeChange={handleThemeChange}
        />
        <MainComponent style={{ flex: 1 }}>{children}</MainComponent>
        <FooterComponent />
      </Box>
    </ThemeProvider>
  );
};

export default LayoutComponent;
