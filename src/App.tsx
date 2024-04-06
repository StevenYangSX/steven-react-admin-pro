import { useRoutes, useLocation, useNavigate } from "react-router-dom";
import routes from "@/router/routes";
import { useEffect, useState } from "react";
import { serverHealthCheck, serverAuthCheck } from "@/api/apiTest";
import { Alert } from "antd";
import useAuthentication from "./hooks/useAuthentication";
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
  // const [shouldRender, setShouldRender] = useState(false);
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
  const { loading, authenticated } = useAuthentication();

  const navigate = useNavigate();

  useEffect(() => {
    // Perform any logic before entering the route
    // For example, you can check if the user is authenticated
    if (!loading) {
      if (currentPath.pathname === "/login" && authenticated) {
        return navigate("/home");
      }
      if (currentPath.pathname !== "/login" && !authenticated) {
        return navigate("/login");
      }
    }
  }, [currentPath.pathname, authenticated, loading]);

  return outlet;
};

function App() {
  const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {};

  const [serverStatus, setServerStatus] = useState(false);
  const [message, setMessage] = useState(null);

  const serverCheck = async () => {
    try {
      const response: any = await serverHealthCheck();
      setServerStatus(true);
      setMessage(response.message);
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  const serverAuth = async () => {
    try {
      const response = await serverAuthCheck();

      setMessage(response.data.message);
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    serverCheck();
    //serverAuth();
  }, []);
  return (
    <>
      <Alert
        message={message}
        type={serverStatus ? "success" : "error"}
        closable
        onClose={onClose}
      />
      <BeforeRouterEnter />
    </>
  );
}

export default App;
