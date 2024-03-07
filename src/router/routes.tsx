import { Navigate } from "react-router-dom";
import { lazy } from "react";
import Home from "@/pages/Home";
import { Suspense } from "react";
import Page3Sub1 from "@/pages/Page3Sub1";
import Page3Sub2 from "@/pages/Page3Sub2";
import Page3Sub3 from "@/pages/Page3Sub3";
import LoginPage from "@/pages/loginPage/LoginPage";

const Page1 = lazy(() => import("@/pages/Page1"));
const Page2 = lazy(() => import("@/pages/Page2"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));
const loadingSuspense = (component: JSX.Element) => (
  <Suspense fallback={<div>loading....</div>}>{component}</Suspense>
);
const routes = [
  {
    path: "/",
    element: <Navigate to="/page1" />,
  },
  {
    path: "/",
    element: <Home />,

    children: [
      {
        path: "/page1",
        element: loadingSuspense(<Page1 />),
      },
      {
        path: "/page2",
        element: loadingSuspense(<Page2 />),
      },
      {
        path: "/page3/page301",
        element: loadingSuspense(<Page3Sub1 />),
      },
      {
        path: "/page3/page302",
        element: loadingSuspense(<Page3Sub2 />),
      },
      {
        path: "/page3/page303",
        element: loadingSuspense(<Page3Sub3 />),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: loadingSuspense(<NotFoundPage />),
  },
  // {
  //   path: "/home",
  //   element: <Home />,
  // },
  // {
  //   path: "/about",
  //   element: loadingSuspense(<About />),
  // },
];

export default routes;
