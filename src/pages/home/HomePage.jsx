import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Pagination,
  Typography,
  Divider,
} from "@mui/material";
import CardComponent from "../../components/CardComponent";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import homePageNormalization from "./homePageNormalization";
import { useSelector } from "react-redux";
import useQueryParams from "../../hooks/useQueryParams";

const itemsPerPage = 3;

const HomePage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [initialDataFromServer, setInitialDataFromServer] = useState([]);
  const navigate = useNavigate();
  const userData = useSelector((store) => store.authSlice.userData);
  const query = useQueryParams();
  const isLoggedIn = !!userData;

  useEffect(() => {
    axios
      .get("/cards")
      .then(({ data }) => {
        if (userData) data = homePageNormalization(data, userData._id);
        setInitialDataFromServer(data);
      })
      .catch((err) => {
        console.error("Error fetching cards:", err);
      });
  }, [userData]);

  useEffect(() => {
    if (!initialDataFromServer.length) return;

    const filter = query.filter ? query.filter : "";
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const filteredData = initialDataFromServer
      .filter((card) => card.title.startsWith(filter))
      .slice(startIndex, endIndex);

    setDataFromServer(filteredData);
  }, [query, initialDataFromServer, currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
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

      const updatedData = initialDataFromServer.filter(
        (card) => card._id !== _id
      );
      setInitialDataFromServer(updatedData);
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  const handleEditCard = (_id) => {
    navigate(`${ROUTES.EDITCARD}/${_id}`);
  };

  const handleLikeCardClick = async (_id, isLiked) => {
    try {
      const response = await axios.post(`/like/${_id}`, {
        isLiked: !isLiked,
      });

      const updatedData = dataFromServer.map((card) => {
        if (card._id === _id) {
          return {
            ...card,
            like: !isLiked,
          };
        }
        return card;
      });

      setDataFromServer(updatedData);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <Container>
      <Typography
        sx={{ textAlign: "center", fontWeight: 700 }}
        variant="h2"
        color="primary"
        gutterBottom
      >
        HBCards
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        Your one-stop destination for business cards
      </Typography>
      <Divider
        sx={{
          m: 2,
          mx: "auto",
          borderBottom: "2px dashed",
          borderColor: "inherit",
        }}
      />
      <Grid container spacing={2}>
        {dataFromServer.map((card) => (
          <Grid item key={card._id} xs={12} sm={6} md={4} lg={4}>
            <CardComponent
              _id={card._id}
              title={card.title}
              subTitle={card.subtitle}
              phone={card.phone}
              address={`${card.address.city}, ${card.address.street} ${card.address.houseNumber}`}
              img={card.image.url}
              alt={card.image.alt}
              like={card.like}
              cardNumber={card.cardNumber}
              onDeleteCard={handleDeleteCard}
              onEditCard={handleEditCard}
              handleLikeCardClick={handleLikeCardClick}
            />
          </Grid>
        ))}
      </Grid>

      {isLoggedIn && (
        <Pagination
          count={Math.ceil(initialDataFromServer.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          size="large"
          shape="rounded"
          variant="outlined"
          siblingCount={1}
          boundaryCount={1}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
            marginBottom: "20px",
            "& .MuiPaginationItem-root": {
              borderRadius: "50%",
              margin: "0 4px",
              "&.Mui-selected": {
                color: "#primary",
                backgroundColor: "#secondary",
              },
            },
          }}
        />
      )}
    </Container>
  );
};

export default HomePage;
