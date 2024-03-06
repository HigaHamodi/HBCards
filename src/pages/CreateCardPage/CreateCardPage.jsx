import React, { useState } from "react";
import {
  Container,
  TextField,
  Grid,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ROUTES from "../../routes/ROUTES";
import { addOrUpdateCard } from "../../service/cardApiService"; // Adjust the import path as necessary
import { textFields } from "../CreateCardPage/TextFields";

const CreateCardPage = ({ cardId }) => {
  const [inputsValue, setInputValue] = useState({
    title: "",
    subtitle: "",
    phone: "",
    add: "",
    mail: "",
    description: "",
    web: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });

  const handleInputChange = (e) => {
    setInputValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleUpdateChangesClick = async () => {
    const cardData = {
      title: inputsValue.title,
      subtitle: inputsValue.subtitle,
      description: inputsValue.description,
      phone: inputsValue.phone,
      email: inputsValue.mail,
      web: inputsValue.web,
      image: {
        url: inputsValue.url,
        alt: inputsValue.alt,
      },
      address: {
        state: inputsValue.state,
        country: inputsValue.country,
        city: inputsValue.city,
        street: inputsValue.street,
        houseNumber: inputsValue.houseNumber,
        zip: +inputsValue.zip,
      },
    };

    try {
      if (cardId) {
        // Update existing card
        await addOrUpdateCard({ ...cardData, _id: cardId }, "YOUR_AUTH_TOKEN"); // Replace "YOUR_AUTH_TOKEN" accordingly
        toast.success("Card updated successfully!");
      } else {
        // Create new card
        await addOrUpdateCard(cardData, "YOUR_AUTH_TOKEN"); // Replace "YOUR_AUTH_TOKEN" accordingly
        toast.success("You've created a business card!");
      }
    } catch (error) {
      console.error("API error:", error.response || error.message);
      toast.error("Error processing your request. Please try again.");
    }
  };

  return (
    <Container>
      <Typography
        sx={{
          textAlign: "center",
          fontWeight: 700,
          fontSize: {
            xs: "2rem",
            sm: "4rem",
          },
        }}
        variant="h2"
        color="primary"
        gutterBottom
      >
        Create - Cards
      </Typography>
      <Divider sx={{ mb: 1 }} />
      <Grid container spacing={1}>
        {textFields.map((field) => (
          <Grid item xs={12} md={6} key={field.id}>
            <TextField
              id={field.id}
              label={field.label}
              variant="outlined"
              fullWidth
              sx={{ mt: 1 }}
              onChange={handleInputChange}
              value={inputsValue[field.id]}
              required={field.required}
            />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2} mt={1} mb={5}>
        <Grid item lg={8} md={8} sm={8} xs p={2}>
          <Button
            variant="outlined"
            sx={{ width: "100%", color: "inherit" }}
            onClick={handleUpdateChangesClick}
          >
            Create Card
          </Button>
        </Grid>
        <Grid item xs>
          <Link to={ROUTES.HOME}>
            <Button
              variant="outlined"
              sx={{
                width: "100%",
              }}
            >
              Discard
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateCardPage;
