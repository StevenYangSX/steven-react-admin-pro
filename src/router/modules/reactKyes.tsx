import SuspenseWrap from "@/router/SuspenseWrap";
import { Navigate } from "react-router-dom";
import { lazy } from "react";
const ReactHooks = lazy(() => import("@/pages/reactKeys/ReactHooks"));

const reactKeysRoutes = [
  {
    path: "/react",
    element: <Navigate to="/react/built-in-hooks" />,
  },
  {
    path: "/react/built-in-hooks",
    element: SuspenseWrap(<ReactHooks />),
  },
];

export default reactKeysRoutes;
