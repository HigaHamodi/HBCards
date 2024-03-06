import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { normalizeData } from "./normalizeData";
import ROUTES from "../../routes/ROUTES";
import signUpSchema from "../../models/signUpSchema";
import { Divider } from "@mui/material";

const fieldData = [
  { id: "first", label: "First Name", required: true },
  { id: "middle", label: "Middle Name", required: false },
  { id: "last", label: "Last Name", required: true },
  { id: "email", label: "Email Address", required: true },
  { id: "password", label: "Password", required: true },
  { id: "phone", label: "Phone", required: true },
  { id: "url", label: "Url", required: false },
  { id: "alt", label: "Alt", required: false },
  { id: "state", label: "State", required: false },
  { id: "country", label: "Country", required: true },
  { id: "city", label: "City", required: true },
  { id: "street", label: "Street", required: true },
  { id: "houseNumber", label: "House Number", required: true },
  { id: "zip", label: "Zip", required: false },
];

const RegisterPage = () => {
  const navigate = useNavigate();

  const [inputsValue, setInputsValue] = useState(
    Object.fromEntries(fieldData.map(({ id }) => [id, ""]))
  );
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleCheckboxChange = () => {
    setCheckboxChecked(!checkboxChecked);
  };

  const handleInputsChange = (e) => {
    const { id, value } = e.target;
    setInputsValue((prevInputsValue) => ({
      ...prevInputsValue,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = {};
    for (const field of fieldData) {
      const { id } = field;
      try {
        await signUpSchema[id].schema.validateAsync(inputsValue[id]);
      } catch (error) {
        errors[id] = error.message;
      }
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      console.log("Validation errors:", errors);
      toast.error("Registration failed. Please fix the errors.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    try {
      const requestData = {
        ...normalizeData(inputsValue),
        isBusiness: checkboxChecked,
      };
      const { data } = await axios.post("/users", requestData);
      console.log("Registration successful. Data:", data);
      toast.success("Registration successful! Redirecting to login...", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      navigate(ROUTES.LOGIN);
    } catch (err) {
      toast.error("Registration failed. Please try again later.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxHeight: "80vh",
      }}
    >
      <Typography
        sx={{ textAlign: "center", fontWeight: 700 }}
        variant="h2"
        color="primary"
        gutterBottom
      >
        Sign up
        <Divider
          sx={{
            m: 2,
            mx: "auto",
            borderBottom: "2px dashed",
            borderColor: "inherit",
          }}
        />
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Grid container spacing={1}>
          {fieldData.map(({ id, label, required }) => (
            <Grid key={id} item xs={12} sm={6}>
              <TextField
                required={required}
                fullWidth
                id={id}
                label={label}
                name={id}
                autoComplete={`new-${id}`}
                value={inputsValue[id]}
                onChange={handleInputsChange}
                error={!!validationErrors[id]}
                helperText={validationErrors[id]}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkboxChecked}
                  onChange={handleCheckboxChange}
                  color="primary"
                />
              }
              label="Business Account"
            />
          </Grid>
        </Grid>
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href={ROUTES.LOGIN} variant="body2">
              Already have an account? Login
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default RegisterPage;
