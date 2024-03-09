import { useRoutes, useLocation, useNavigate } from "react-router-dom";
import routes from "@/router/routes";
import { useEffect, useState } from "react";

// const ToHomePage = () => {
//   const navigateTo = useNavigate();
//   useEffect(() => {
//     navigateTo("/page1");
//   }, []);
//   return <></>;
// };

// const ToLoginPage = () => {
//   const navigateTo = useNavigate();
//   useEffect(() => {
//     navigateTo("/login");
//   }, []);
//   return <></>;
// };

const BeforeRouterEnter = () => {
  const currentPath = useLocation();
  const outlet = useRoutes(routes);
  const [shouldRender, setShouldRender] = useState(false);
  /*
  User Authentication Rules
  1. if authenticated, and visti /login page, then direct to /home
  2. if not authenticated, and visit other pages except /login page, direct to /login page.
  3. other operations keep normal
  */

  // if (currentPath.pathname === "/login" && isAuthenticated) {
  //   return <ToHomePage />;
  // }
  // if (currentPath.pathname !== "/login" && !isAuthenticated) {
  //   return <ToLoginPage />;
  // }

  const navigate = useNavigate();

  useEffect(() => {
    // Perform any logic before entering the route
    // For example, you can check if the user is authenticated
    const isAuthenticated = true;
    if (currentPath.pathname === "/login" && isAuthenticated) {
      return navigate("/page1");
    }
    if (currentPath.pathname !== "/login" && !isAuthenticated) {
      return navigate("/login");
    }
    setShouldRender(true);
  }, [currentPath.pathname, navigate]);

  if (!shouldRender) {
    return null; // or any placeholder component or loading indicator
  }
  return outlet;
};
function App() {
  return (
    <>
      <BeforeRouterEnter />
    </>
  );
}

export default App;
