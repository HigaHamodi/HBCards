import { Link, Typography, Box } from "@mui/material";

const CopyrightComponent = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
      sx={{
        mt: 4,
        pt: 2,
        borderTop: "1px solid #ccc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ mr: 1 }}>CopyRights &copy; {new Date().getFullYear()} </Box>
      <Link
        color="inherit"
        href="#"
        sx={{ textDecoration: "none" }}
      >
        Higa Hamodi
      </Link>
      <Box sx={{ ml: 1 }}>
        <span role="img" aria-label="heart">
          ❤️
        </span>
      </Box>
    </Typography>
  );
};

export default CopyrightComponent;
