import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BusinessTwoToneIcon from "@mui/icons-material/BusinessTwoTone";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import FilterComponent from "./headerlayout/FilterComponent";
import Links from "./headerlayout/Links";
import LeftDrawerComponent from "./headerlayout/LeftDrawerComponent";
import { loggedOutLinks, alwaysLinks } from "../myLinks";

const HeaderComponent = ({ isDarkTheme, onThemeChange }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const isLoggedIn = useSelector((store) => store.authSlice.loggedIn);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = async (event) => {
    setAnchorEl(null);
    handleMobileMenuClose();

    const isLogoutClicked = event.target.textContent === "Logout";

    if (isLoggedIn && isLogoutClicked) {
      localStorage.removeItem("token");
      localStorage.setItem("showLogoutToast", "true");
      window.location.reload();
    } else {
      navigate("/");
    }
  };

  const handleThemeChange = (event) => {
    onThemeChange(event.target.checked);
  };

  const handleOpenDrawerClick = () => {
    setIsOpen(true);
  };

  const handleCloseDrawerClick = () => {
    setIsOpen(false);
  };

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "mobile-menu";

  React.useEffect(() => {
    const showLogoutToast = localStorage.getItem("showLogoutToast");

    if (showLogoutToast === "true") {
      toast.success("🚀 Logout Successful! See you again soon.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        icon: "👋",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
          fontWeight: "bold",
          fontSize: "16px",
        },
      });

      localStorage.removeItem("showLogoutToast");
      navigate("/");
    }
  }, [navigate]);

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {isLoggedIn && <MenuItem onClick={handleMenuClose}>Logout</MenuItem>}
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        {isLoggedIn ? "Logout" : "Login"}
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleOpenDrawerClick}
          >
            <Box sx={{ display: { xs: "block", md: "none" } }}>
              <MenuIcon />
            </Box>
          </IconButton>

          <LeftDrawerComponent
            isOpen={isOpen}
            onCloseDrawer={handleCloseDrawerClick}
          />

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              p: 2,
            }}
          >
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <IconButton color="inherit">
                <BusinessTwoToneIcon sx={{ mr: 1 }} />
                HBCard
              </IconButton>
            </Link>
          </Typography>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexGrow: 1,
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            {alwaysLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    p: 2,
                    textDecoration: "none",
                  }}
                >
                  {link.children}
                </Typography>
              </Link>
            ))}
            <Links />
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "block" },
            }}
          ></Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <FilterComponent
              sx={{
                p: 2,
              }}
            />
            <IconButton color="inherit" onClick={handleThemeChange}>
              {isDarkTheme ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
            {isLoggedIn ? (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              ></IconButton>
            ) : (
              loggedOutLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      p: 2,
                      textDecoration: "none",
                    }}
                  >
                    {link.children}
                  </Typography>
                </Link>
              ))
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexGrow: { xs: 1, md: 0 },
              justifyContent: "flex-end",
              mr: 2,
            }}
          >
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {isLoggedIn ? (
                <img
                  src="/assets/imgs/profile.svg"
                  alt="UserPhoto"
                  style={{
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                  }}
                />
              ) : null}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
      {renderMobileMenu}
      <ToastContainer />
    </Box>
  );
};

export default HeaderComponent;
