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
  const isAuthenticated = useAuthentication();

  const navigate = useNavigate();

  useEffect(() => {
    // Perform any logic before entering the route
    // For example, you can check if the user is authenticated

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
  const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(e, "I was closed.");
  };

  const [serverStatus, setServerStatus] = useState(false);
  const [message, setMessage] = useState(null);

  const serverCheck = async () => {
    try {
      const response: any = await serverHealthCheck();
      setServerStatus(true);
      setMessage(response.message);
    } catch (error: any) {
      console.log("error111=>", error);
      setMessage(error.message);
    }
  };

  const serverAuth = async () => {
    try {
      const response = await serverAuthCheck();
      console.log("response...", response);
      setMessage(response.data.message);
    } catch (error: any) {
      console.log("error222=>", error);
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
