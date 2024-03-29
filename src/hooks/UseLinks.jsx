import ROUTES from "../routes/ROUTES";
import { useSelector } from "react-redux";

const useLinks = () => {
  const loggedIn = useSelector((store) => store.authSlice.loggedIn);
  const isAdmin = useSelector((store) => store.authSlice.isAdmin);
  const isBusiness = useSelector((store) => store.authSlice.isBusiness);

  let links = [ROUTES.ABOUT];
  if (isAdmin || isBusiness) {
    links.push(ROUTES.MYCARDS);
  }
  if (isAdmin) {
    links.push(ROUTES.FAVCARD);
  }
  if (loggedIn) {
    links.push(ROUTES.SANDBOX);
  } else {
    links = links.concat([ROUTES.REGISTER, ROUTES.LOGIN]);
  }
  return links;
};

export default useLinks;
