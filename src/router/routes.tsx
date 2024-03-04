import { Navigate } from "react-router-dom";
import { lazy } from "react";
import Home from "@/pages/Home";
import { Suspense } from "react";

const About = lazy(() => import("@/pages/About"));

const loadingSuspense = (component: JSX.Element) => (
  <Suspense fallback={<div>loading....</div>}>{component}</Suspense>
);
const routes = [
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/about",
    element: loadingSuspense(<About />),
  },
];

export default routes;
