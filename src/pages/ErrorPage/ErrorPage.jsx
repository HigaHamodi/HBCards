import React from "react";
import { Container, Grid, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <Container style={{ minHeight: "100vh" }}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={2}
        style={{ minHeight: "80%" }}
      >
        <Grid item xs={12} md={8} textAlign="center">
          <Typography variant="h3" gutterBottom>
            Page not found
          </Typography>
          <Typography variant="h4" gutterBottom>
            We apologize for the inconvenience.
          </Typography>
          <Typography variant="h5" gutterBottom>
            Oops! Something went wrong
          </Typography>
          <Button variant="contained" component={Link} to="/" color="secondary">
            Go to Home
          </Button>
        </Grid>
        <Grid item xs={12} md={8} textAlign="center">
          <img
            src="/assets/imgs/error.svg"
            alt="broken robot"
            style={{ width: "100%", maxWidth: "400px" }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ErrorPage;
