import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import CopyrightComponent from "./CopyrightComponent/CopyrightComponent";
import ROUTES from "../../routes/ROUTES";
import { validateLogin } from "../../validation/loginValidation";
import { Alert } from "@mui/material";
import useAutoLogin from "../../hooks/useAutoLogin";
import { storeToken } from "../../service/storageService";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";

const LoginPage = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [errorsState, setErrorsState] = useState(null);
  const navigate = useNavigate();
  const autoLogin = useAutoLogin();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const joiResponse = validateLogin({
        email: emailValue,
        password: passwordValue,
      });

      setErrorsState(joiResponse);

      if (joiResponse) {
        return;
      }

      const { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passwordValue,
      });

      storeToken(data, rememberMe);

      toast("You logged in successfully 👌", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      autoLogin(true);

      if (navigator.onLine) {
        navigate(ROUTES.HOME);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        navigate(ROUTES.HOME);
      }
    } catch (err) {
      alert("Login error, please try again");
      console.log("err from login", err);
    }
  };

  const handleEmailInputChange = (e) => {
    setEmailValue(e.target.value);
  };

  const handlePasswordInputChange = (e) => {
    setPasswordValue(e.target.value);
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <Grid container component="main" sx={{ height: "80vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?landscape)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <AccountCircleTwoToneIcon
            sx={{
              fontSize: 50,
              color: "primary.main",
            }}
          />
          <Typography
            sx={{ textAlign: "center", fontWeight: 700 }}
            variant="h2"
            color="primary"
            gutterBottom
          >
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={emailValue}
              onChange={handleEmailInputChange}
            />
            {errorsState && errorsState.email && (
              <Alert severity="warning">{errorsState.email}</Alert>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={passwordValue}
              onChange={handlePasswordInputChange}
            />
            {errorsState && errorsState.password && (
              <Alert severity="warning">{errorsState.password}</Alert>
            )}
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to={ROUTES.REGISTER} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <CopyrightComponent sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
