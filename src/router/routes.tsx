import Home from "@/pages/indexPageLayout/Home";

import { Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import NotFoundPage from "@/pages/notFoundPage/NotFoundPage";
import LoginPage from "@/pages/loginPage/LoginPage";

const DashBoard = lazy(() => import("@/pages/dashBoard/DashBoard"));
const MenuManagement = lazy(() => import("@/pages/systemPages/MenuManagement"));
const RoleManagement = lazy(() => import("@/pages/systemPages/RoleManagement"));
const suspenseWrap = (component: JSX.Element) => {
  return <Suspense fallback={<div>loading.....</div>}>{component}</Suspense>;
};
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
        element: suspenseWrap(<DashBoard />),
      },
      {
        path: "/system",
        element: <Navigate to="/system/menu-management" />,
      },
      {
        path: "/system/menu-management",
        element: suspenseWrap(<MenuManagement />),
      },
      {
        path: "/system/role-management",
        element: suspenseWrap(<RoleManagement />),
      },
      {
        path: "/order",
        element: <Navigate to="/order/list" />,
      },
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
