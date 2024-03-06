import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";

const BusinessGuard = ({ children }) => {
  // Using useSelector to get the loggedIn state from Redux store
  const loggedIn = useSelector((store) => store.authSlice.loggedIn);

  // Checking if the user is logged in
  if (loggedIn) {
    // If user is logged in, render the children components
    return children;
  } else {
    // If user is not logged in, redirect to the login page
    return <Navigate to={ROUTES.LOGIN} replace={true} />;
  }
};

export default BusinessGuard;
