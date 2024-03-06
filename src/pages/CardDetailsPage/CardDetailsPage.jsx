import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  Container,
} from "@mui/material";
import { fetchCardDetailsById } from "../../service/cardApiService"; // Adjust the import path as necessary

const CardDetailsPage = () => {
  const { cardId } = useParams();
  const [cardDetails, setCardDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const response = await fetchCardDetailsById(cardId);

        if (response) {
          const { image, alt, title, subTitle, phone, address, cardNumber } =
            response;

          setCardDetails({
            img: image.url,
            alt,
            title,
            subTitle,
            phone,
            address,
            cardNumber,
          });
        } else {
          setError("Invalid response structure. Please check the API.");
        }
      } catch (error) {
        setError("Error fetching card details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCardDetails();
  }, [cardId]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography style={{ color: "red" }}>{error}</Typography>;
  }

  return (
    <Container maxWidth="lg">
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="h2"
            align="center"
            color="primary"
            gutterBottom
            sx={{ fontWeight: 700, fontSize: { xs: "2.5rem", md: "3rem" } }}
          >
            Card Details
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: "16px", boxShadow: 6 }}>
            {cardDetails.img && (
              <CardMedia
                component="img"
                image={cardDetails.img}
                alt={cardDetails.alt || "No Alt Text"}
                sx={{
                  borderRadius: "16px 16px 0 0",
                  maxHeight: "300px",
                  objectFit: "cover",
                }}
              />
            )}
            <CardContent>
              <CardHeader
                title={cardDetails.title}
                subheader={cardDetails.subTitle}
                sx={{
                  p: 0,
                  mb: 1,
                  "& .MuiTypography-root": {
                    fontSize: { xs: "1.5rem", md: "1.8rem" },
                  },
                }}
                titleTypographyProps={{
                  variant: "h4",
                  sx: {
                    fontWeight: 700,
                    fontSize: { xs: "2rem", md: "2.5rem" },
                  },
                }}
              />
              <Divider />
              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="body1"
                  fontWeight="700"
                  gutterBottom
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: { xs: "1rem", md: "1.2rem" },
                    },
                  }}
                >
                  Phone:{" "}
                  <Typography variant="body1" component="span">
                    {cardDetails.phone}
                  </Typography>
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight="700"
                  gutterBottom
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: { xs: "1rem", md: "1.2rem" },
                    },
                  }}
                >
                  Address:
                </Typography>
                {cardDetails.address && (
                  <Box sx={{ ml: 2 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        "& .MuiTypography-root": {
                          fontSize: { xs: "1rem", md: "1.2rem" },
                        },
                      }}
                    >
                      {cardDetails.address.city}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        "& .MuiTypography-root": {
                          fontSize: { xs: "1rem", md: "1.2rem" },
                        },
                      }}
                    >
                      {cardDetails.address.street}
                    </Typography>
                  </Box>
                )}
                <Typography
                  variant="body1"
                  fontWeight="700"
                  gutterBottom
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: { xs: "1rem", md: "1.2rem" },
                    },
                  }}
                >
                  Card Number:{" "}
                  <Typography variant="body1" component="span">
                    {cardDetails.cardNumber}
                  </Typography>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CardDetailsPage;
