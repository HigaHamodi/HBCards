import { Route, Routes } from "react-router-dom";

import ROUTES from "./ROUTES";
import HomePage from "../pages/home/HomePage";
import RegisterPage from "../pages/register/RegisterPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import LoginPage from "../pages/login/LoginPage";
import EditCardPage from "../pages/EditCardPage/EditCardPage";
import SandboxPage from "../pages/Sandbox/SandboxPage";
import CreateCardPage from "../pages/CreateCardPage/CreateCardPage";
import AuthGuard from "../guard/AuthGuard";
import BizGuard from "../guard/BizGuard";
import AboutPage from "../pages/AboutPage/About";
import FavoriteCardPage from "../pages/FavoriteCardPage/FavoriteCardPage";
import MyCardsPage from "../pages/MyCardsPage/MyCardsPage";
import EditStatusPage from "../pages/Sandbox/EditStatusPage";
import CardDetailsPage from "../pages/CardDetailsPage/CardDetailsPage";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.FAVCARD} element={<FavoriteCardPage />} />
      <Route path={ROUTES.MYCARDS} element={<MyCardsPage />} />
      <Route path={ROUTES.EDITSTATUS} element={<EditStatusPage />} />
      <Route path="/card-details/:cardId" element={<CardDetailsPage />} />

      <Route
        path={ROUTES.CREATECARD}
        element={
          <AuthGuard>
            <BizGuard>
              <CreateCardPage />
            </BizGuard>
          </AuthGuard>
        }
      />
      <Route path={`${ROUTES.EDITCARD}/:id`} element={<EditCardPage />} />
      <Route path={ROUTES.SANDBOX} element={<SandboxPage />}>
        <Route path="Favoritecard" element={<favoriteCardPage />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};
export default Router;
