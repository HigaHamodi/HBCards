import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";

const BizGuard = ({ children }) => {
  // Using useSelector to get the userData from Redux store
  const userData = useSelector((store) => store.authSlice.userData);

  // Checking if userData exists and if the user is a business user or admin
  if (userData && (userData.isBusiness || userData.isAdmin)) {
    // If user is a business user or admin, render the children components
    return children;
  } else {
    // If user is not a business user or admin, redirect to the login page
    return <Navigate to={ROUTES.LOGIN} replace={true} />;
  }
};

export default BizGuard;
