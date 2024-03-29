import React, { useEffect, useState } from "react";
import CardComponent from "../../components/CardComponent";
import axios from "axios";
import { useSelector } from "react-redux";
import { Container, Grid, Typography, Divider, Fab } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useNavigate, useLocation } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import AddIcon from "@mui/icons-material/Add";

const MyCardsPage = () => {
  const [myCards, setMyCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const userData = useSelector((state) => state.authSlice.userData);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchMyCards = async () => {
      try {
        setLoading(true);

        if (!userData) {
          setLoading(false);
          return;
        }

        const userId = userData._id;
        const config = {
          headers: {
            "x-auth-token": process.env.REACT_APP_API_TOKEN,
          },
        };

        const response = await axios.get(
          `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards`,
          config
        );

        const userCards = response.data.filter(
          (card) => card.user_id === userId
        );

        const cardsWithLikeStatus = userCards.map((card) => ({
          ...card,
          like: localStorage.getItem(`like_${card._id}`) === "true",
        }));

        setMyCards(cardsWithLikeStatus);
        setLoading(false);
      } catch (error) {
        setError("Error fetching user's cards. Please try again.");
        setLoading(false);
      }
    };

    fetchMyCards();
  }, [userData, location.pathname]);

  const handleEditCard = (_id) => {
    navigate(`${ROUTES.EDITCARD}/${_id}`);
  };

  const handleDeleteCard = async (_id) => {
    try {
      const config = {
        headers: {
          "x-auth-token": process.env.REACT_APP_API_TOKEN,
        },
      };

      await axios.delete(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${_id}`,
        config
      );

      setMyCards((prevCards) => prevCards.filter((card) => card._id !== _id));
    } catch (error) {
      setError("Error deleting card. Please try again.");
    }
  };

  const handleLikeChange = (_id, newLikeStatus) => {
    setMyCards((prevCards) =>
      prevCards.map((card) =>
        card._id === _id ? { ...card, like: newLikeStatus } : card
      )
    );

    localStorage.setItem(`like_${_id}`, newLikeStatus.toString());
  };

  const handlePageChange = (_, page) => {
    setCurrentPage(page);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "900px",
        margin: "auto",
      }}
    >
      <Typography
        sx={{ textAlign: "center", fontWeight: 700 }}
        variant="h2"
        color="primary"
        gutterBottom
      >
        MY CARDS
        <Divider sx={{ mt: 4 }} />
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {myCards
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map(({ _id, title, subtitle, phone, address, image, like }) => (
            <Grid item key={_id} xs={12} sm={6} md={4} lg={3}>
              <CardComponent
                _id={_id}
                title={title}
                subTitle={subtitle}
                phone={phone}
                address={`${address.city}, ${address.street} ${address.houseNumber}`}
                img={image && image.url}
                alt={image && image.alt}
                like={like}
                onDeleteCard={handleDeleteCard}
                onEditCard={handleEditCard}
                onLikeChange={handleLikeChange}
              />
            </Grid>
          ))}
      </Grid>
      <Pagination
        count={Math.ceil(myCards.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      />
      <Fab
        color="primary"
        aria-label="add"
        variant="outlined"
        sx={{
          position: "fixed",
          bottom: 100,
          right: 50,
        }}
        onClick={() => navigate(ROUTES.CREATECARD)}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
};

export default MyCardsPage;
