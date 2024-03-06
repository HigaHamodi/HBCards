import { Box } from "@mui/material";
import nextKey from "generate-my-key";
import {
  loggedInLinks,
  loggedOutLinks,
  isBusiness,
  isAdmin,
} from "../../myLinks";
import NavLinkComponent from "../NavLinkComponent";
import { useSelector } from "react-redux";

const Links = () => {
  const loggedIn = useSelector((store) => store.authSlice.loggedIn);
  const businessUser = useSelector((store) => store.authSlice.isBusiness);
  const adminUser = useSelector((store) => store.authSlice.isAdmin);
  let userLinks = [];

  if (adminUser) {
    userLinks = isAdmin;
  } else if (businessUser) {
    userLinks = isBusiness;
  }

  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      {loggedIn &&
        loggedInLinks.map((link) => (
          <NavLinkComponent to={link.to} key={nextKey()}>
            {link.children}
          </NavLinkComponent>
        ))}

      {userLinks.map((link) => (
        <NavLinkComponent to={link.to} key={nextKey()}>
          {link.children}
        </NavLinkComponent>
      ))}
    </Box>
  );
};

export default Links;
