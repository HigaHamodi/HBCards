import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Grid,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../../routes/ROUTES";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { textFields } from "../CreateCardPage/TextFields";

const EditCardPage = () => {
  const [inputsValue, setInputValue] = useState({});
  const { id: _id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await axios.get(`/cards/${_id}`);
        const cardData = response.data;

        setInputValue({
          title: cardData.title || "",
          subtitle: cardData.subtitle || "",
          phone: cardData.phone || "",
          mail: cardData.email || "",
          description: cardData.description || "",
          web: cardData.web || "",
          url: cardData.image?.url || "",
          alt: cardData.image?.alt || "",
          state: cardData.address?.state || "",
          country: cardData.address?.country || "",
          city: cardData.address?.city || "",
          street: cardData.address?.street || "",
          houseNumber: cardData.address?.houseNumber || "",
          zip: cardData.address?.zip || "",
        });
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };

    fetchCardData();
  }, [_id]);

  const handleInputChange = (e) => {
    setInputValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleUpdateChangesClick = async () => {
    try {
      // Your update logic here

      toast.success("Card has been edited successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      navigate(ROUTES.MYCARDS);
      window.location.reload();
    } catch (err) {
      console.error("Error updating card:", err);

      toast.error(
        "Error updating card. Please fix the mistake and try again.",
        {
          position: "top-right",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    }
  };

  return (
    <Container sx={{ padding: "50px" }}>
      <Typography variant="h2" sx={{ mb: 1, padding: "10px", pb: "0px" }}>
        Card - Edit
      </Typography>
      <Typography variant="body1" sx={{ mb: 1, padding: "3px", ml: "7px" }}>
        Put new values in the correct input
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <Grid container flexDirection={"column"}>
        {textFields.map((field) => (
          <TextField
            key={field.id}
            id={field.id}
            label={field.label}
            variant="outlined"
            sx={{ mt: "10px" }}
            onChange={handleInputChange}
            value={inputsValue[field.id] || ""}
            required={field.required}
          />
        ))}
      </Grid>
      <Grid container spacing={2}>
        <Grid item lg={8} md={8} sm={8} xs>
          <Button
            variant="outlined"
            sx={{ mt: 2, width: "100%", ml: "0%", bgcolor: "lightskyblue" }}
            onClick={handleUpdateChangesClick}
          >
            Update Changes
          </Button>
        </Grid>
        <Grid item xs>
          <Link to={ROUTES.MYCARDS}>
            <Button
              variant="outlined"
              sx={{
                mt: 2,
                width: "100%",
                ml: "0%",
                bgcolor: "navy",
                color: "gray",
              }}
            >
              Discard Changes
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditCardPage;
