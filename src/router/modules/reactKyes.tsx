import SuspenseWrap from "@/router/SuspenseWrap";
import { Navigate } from "react-router-dom";
import { lazy } from "react";
const ReactHooks = lazy(() => import("@/pages/reactKeys/ReactHooks"));
const ReactLifeCycle = lazy(() => import("@/pages/reactKeys/ReactLifeCycle"));
const reactKeysRoutes = [
  {
    path: "/react",
    element: <Navigate to="/react/built-in-hooks" />,
  },
  {
    path: "/react/built-in-hooks",
    element: SuspenseWrap(<ReactHooks />),
  },
  {
    path: "/react/life-cycle",
    element: SuspenseWrap(<ReactLifeCycle />),
  },
];

export default reactKeysRoutes;
