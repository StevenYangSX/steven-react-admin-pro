import SuspenseWrap from "@/router/SuspenseWrap";
import { lazy } from "react";
const DashBoard = lazy(() => import("@/pages/dashBoard/DashBoard"));
const dataDisplayingRoutes = [
  {
    path: "/datadisplaying",
    element: SuspenseWrap(<DashBoard />),
  },
];

export default dataDisplayingRoutes;
