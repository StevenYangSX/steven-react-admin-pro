import Home from "@/pages/indexPageLayout/Home";

import { Navigate } from "react-router-dom";
import { lazy } from "react";
import NotFoundPage from "@/pages/notFoundPage/NotFoundPage";
import LoginPage from "@/pages/loginPage/LoginPage";
import reactKeysRoutes from "./modules/reactKyes";
import systemSetting from "./modules/systemSetting";
import SuspenseWrap from "./SuspenseWrap";
const DashBoard = lazy(() => import("@/pages/dashBoard/DashBoard"));

const routes = [
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/home",
        element: SuspenseWrap(<DashBoard />),
      },
      ...reactKeysRoutes,
      ...systemSetting,
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export default routes;
