import Home from "@/pages/Home";

import { Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import NotFoundPage from "@/pages/NotFoundPage";
import LoginPage from "@/pages/loginPage/LoginPage";
import Page3Sub1 from "@/pages/Page3Sub1";
import Page3Sub2 from "@/pages/Page3Sub2";
import Page3Sub3 from "@/pages/Page3Sub3";

const Page2 = lazy(() => import("@/pages/Page2"));
const Page1 = lazy(() => import("@/pages/Page1"));

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
        element: suspenseWrap(<Page1 />),
      },
      // {
      //   path: "/page2",
      //   element: suspenseWrap(<Page2 />),
      // },
      {
        path: "/product",
        element: <Navigate to="/product/add" />,
      },
      {
        path: "/product/add",
        element: suspenseWrap(<Page3Sub1 />),
      },
      {
        path: "/product/category",
        element: suspenseWrap(<Page3Sub2 />),
      },
      {
        path: "/order",
        element: <Navigate to="/order/list" />,
      },
      {
        path: "/order/list",
        element: suspenseWrap(<Page3Sub3 />),
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
