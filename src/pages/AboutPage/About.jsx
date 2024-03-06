import React from "react";
import { Container, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";

const AboutPage = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={15}>
        <Grid
          item
          container
          xs={12}
          md={6}
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 5 }}
        >
          <Grid item>
            <Typography
              sx={{ textAlign: "center", fontWeight: 700 }}
              variant="h2"
              color="primary"
              gutterBottom
            >
              About Us
            </Typography>
            <Typography variant="body1" gutterBottom>
              Welcome to Our App! Our app is designed to help you find
              businesses to post your services or to find businesses to fix your
              needs. Our goal is to make it easy for you to connect with other
              businesses and find the services you need.
            </Typography>
            <Typography variant="body1" gutterBottom>
              Our app includes a variety of features, such as{" "}
              <strong>Search</strong>, <strong>Posts</strong>, and{" "}
              <strong>Business Profiles</strong>, that are designed to help you
              connect with other businesses and find the services you need. We
              are constantly working to improve our app and add new features to
              make it even better.
            </Typography>
            <Typography variant="body1" gutterBottom>
              Thank you for choosing Our App! We hope you enjoy using it as much
              as we enjoyed building it. If you have any questions or feedback,
              please don't hesitate to contact us.
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          md={6}
          justifyContent="center"
          alignItems="center"
        >
          <img
            src="/assets/imgs/about-business.png"
            alt="business-card"
            style={{
              maxWidth: "100%",
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutPage;
