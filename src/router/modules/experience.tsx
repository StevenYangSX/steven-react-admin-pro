import SuspenseWrap from "@/router/SuspenseWrap";
import { lazy } from "react";
const Experience = lazy(() => import("@/pages/experience/Experience"));
const experienceRoutes = [
  {
    path: "/experience",
    element: SuspenseWrap(<Experience />),
  },
];

export default experienceRoutes;
