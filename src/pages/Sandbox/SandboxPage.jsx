import React, { Fragment, useEffect, useState } from "react";
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Box,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";

const SandboxPage = () => {
  const user = useSelector((state) => state.authSlice);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const { data } = await axios.get("users");
        setUsers(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchAllUsers();
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`users/${userId}`);
      const updatedUsers = users.filter((user) => user._id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleChangeUserType = async (userId, isBusiness) => {
    try {
      const data = { isBusiness: !isBusiness };
      await axios.patch(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userId}`,
        data
      );
      const updatedUsers = users.map((user) => {
        if (user._id === userId) {
          return { ...user, isBusiness: !isBusiness };
        }
        return user;
      });
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const makeRegularUser = (userId) => {
    handleChangeUserType(userId, true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const MobileTableRow = ({ userData }) => (
    <TableRow key={userData._id}>
      <TableCell>
        <strong>{userData.name.first}</strong>
        <div>{userData.phone}</div>
        <div>
          {userData.isAdmin
            ? "Admin"
            : userData.isBusiness
            ? "Business"
            : "Regular"}
        </div>
      </TableCell>
      <TableCell>
        <Button
          onClick={() =>
            handleChangeUserType(userData._id, userData.isBusiness)
          }
        >
          {userData.isBusiness ? "Make Regular" : "Make Business"}
        </Button>
        <Button sx={{ color: "red" }} onClick={() => deleteUser(userData._id)}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );

  return (
    <Fragment>
      <Typography
        sx={{ textAlign: "center", fontWeight: 700 }}
        variant="h2"
        color="primary"
        gutterBottom
      >
        SANDBOX
        <Divider
          sx={{
            m: 2,
            mx: "auto",
            borderBottom: "2px dashed",
            borderColor: "inherit",
          }}
        />
      </Typography>

      {user.isAdmin && (
        <Box
          p={isMobile ? 1 : 3}
          sx={{
            marginBottom: "16px",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <TableContainer>
            <Table>
              {!isMobile && (
                <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>User ID</TableCell>
                    <TableCell>User Name</TableCell>
                    <TableCell>User Phone</TableCell>
                    <TableCell>User Type</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
              )}
              <TableBody>
                {(rowsPerPage > 0
                  ? users.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : users
                ).map((userData, index) =>
                  isMobile ? (
                    <MobileTableRow key={userData._id} userData={userData} />
                  ) : (
                    <TableRow key={userData._id}>
                      <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                      <TableCell>{userData._id}</TableCell>
                      <TableCell>{userData.name.first}</TableCell>
                      <TableCell>{userData.phone}</TableCell>
                      <TableCell>
                        {userData.isAdmin
                          ? "Admin"
                          : userData.isBusiness
                          ? "Business"
                          : "Regular"}
                      </TableCell>
                      <TableCell>
                        {!userData.isAdmin && (
                          <>
                            <Button
                              sx={{ color: "red" }}
                              onClick={() => deleteUser(userData._id)}
                            >
                              Delete
                            </Button>
                            <Button
                              onClick={() =>
                                handleChangeUserType(
                                  userData._id,
                                  userData.isBusiness
                                )
                              }
                            >
                              {userData.isBusiness
                                ? "Make Regular"
                                : "Make Business"}
                            </Button>
                          </>
                        )}
                        {userData.isAdmin && (
                          <Button
                            onClick={() =>
                              handleChangeUserType(
                                userData._id,
                                userData.isBusiness
                              )
                            }
                          >
                            {userData.isBusiness
                              ? "Make Regular"
                              : "Make Business"}
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {!isMobile && (
            <TablePagination
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: 5,
                padding: 5,
                "& .MuiTablePagination-root": {
                  color: "#1976d2",
                },
                "& .MuiSelect-root, & .MuiTablePagination-actions, & .MuiIconButton-root":
                  {
                    color: "#1976d2",
                    transition: "color 0.3s ease",
                    "&:hover": {
                      color: "#ff6f00",
                    },
                  },
                "& .MuiInput-root": {
                  color: "#1976d2",
                  "& .MuiSelect-root": {
                    color: "#1976d2",
                  },
                },
                "& .MuiPagination-ul": {
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
                "& .MuiPaginationItem-root": {
                  borderRadius: "50%",
                  margin: "0 4px", // Adjust margin as needed
                  "&.Mui-selected": {
                    backgroundColor: "#1976d2",
                    color: "#fff",
                  },
                },
              }}
              rowsPerPageOptions={[10, 25, 50, { label: "All", value: -1 }]}
              component="div"
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Box>
      )}
    </Fragment>
  );
};

export default SandboxPage;
