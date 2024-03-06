import React, { useEffect, useState } from "react";
import CardComponent from "../../components/CardComponent";
import axios from "axios";
import { useSelector } from "react-redux";
import { Container, Grid, Typography, Divider } from "@mui/material";
import Pagination from "@mui/material/Pagination";

const FavoriteCardPage = () => {
  const [likedCards, setLikedCards] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const userData = useSelector((store) => store.authSlice.userData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchLikedCards = async () => {
      try {
        setLoading(true);
        const userId = userData._id;
        const dataFromServer = await axios.get(
          "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards"
        );
        const cards = dataFromServer.data.filter((card) =>
          card.likes.includes(userId)
        );

        setLikedCards(cards);
        setLoading(false);
      } catch (error) {
        setError("Error fetching liked card IDs");
        setLoading(false);
      }
    };

    fetchLikedCards();
  }, [userData]);

  const handleLikeRemove = (_id) => {
    const updatedLikedCards = likedCards.filter((card) => card._id !== _id);
    setLikedCards(updatedLikedCards);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <Typography
        sx={{ textAlign: "center", fontWeight: 700 }}
        variant="h2"
        color="primary"
        gutterBottom
      >
        FAVORITE
        <Divider sx={{ mx: "auto", my: 2, borderBottom: "2px dashed" }} />{" "}
        {/* Add borderBottom with dashed style */}
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {" "}
        {/* Add justifyContent="center" to center the Grid items */}
        {likedCards
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((card) => (
            <Grid item key={card._id} xs={12} sm={6} md={4} lg={3}>
              <CardComponent
                _id={card._id}
                title={card.title}
                subTitle={card.subtitle}
                phone={card.phone}
                address={`${card.address.city}, ${card.address.street} ${card.address.houseNumber}`}
                img={card.image && card.image.url}
                alt={card.image && card.image.alt}
                like={true}
                onToggleFavorite={() => handleLikeRemove(card._id)}
              />
            </Grid>
          ))}
      </Grid>

      <Pagination
        count={Math.ceil(likedCards.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          marginTop: 15,
          marginBottom: 15,
        }}
      />
    </Container>
  );
};

export default FavoriteCardPage;
