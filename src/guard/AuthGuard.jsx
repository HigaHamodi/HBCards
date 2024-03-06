import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";

const AuthGuard = ({ children }) => {
  // Using useSelector to get the loggedIn state from Redux store
  const loggedIn = useSelector((store) => store.authSlice.loggedIn);

  // If user is logged in, render the children components
  if (loggedIn) {
    return children;
  } else {
    // If user is not logged in, redirect to the login page
    return <Navigate to={ROUTES.LOGIN} replace={true} />;
  }
};

export default AuthGuard;
