import { useRoutes, useLocation, useNavigate } from "react-router-dom";
import routes from "@/router/routes";
import { useEffect } from "react";
import { Spin, message } from "antd";
import useAuthentication from "./hooks/useAuthentication";
import { fetchServerStatus } from "./store/slices/serverHealthSlice";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { HttpStatus } from "./types/systemStateTypes";
import setupAxiosInterceptors from "./utils/axiosInterceptorSetup";
const BeforeRouterEnter = () => {
  const currentPath = useLocation();
  const outlet = useRoutes(routes);
  const { loading, authenticated } = useAuthentication();
  const navigate = useNavigate();
  useEffect(() => {
    // Perform any logic before entering the route
    // For example, you can check if the user is authenticated
    if (!loading) {
      if (currentPath.pathname === "/login" && authenticated) {
        return navigate("/home");
      } else if (currentPath.pathname !== "/login" && !authenticated) {
        return navigate("/login");
      }
    }
  }, [currentPath.pathname, authenticated, loading]);

  if (loading) {
    return null;
  } else {
    return outlet;
  }
};

function App() {
  const dispatch = useAppDispatch();
  const serverStatus = useAppSelector((state) => state.serverHealthReducer.serverRunning);
  const serverStatusCheckProcess = useAppSelector((state) => state.serverHealthReducer.httpStatus);
  const serverError = useAppSelector((state) => state.serverHealthReducer.error);
  const [messageApi, contextHolder] = message.useMessage();

  /*
   When configuring axios request interceptor, it needs to access store data. However, 
   this causes a "early access" before store initializaion problem. 
   So this configuration is moved to here, which ensures the store has been setup properly.
  */
  useEffect(() => {
    setupAxiosInterceptors();
  }, []);
  useEffect(() => {
    if (serverStatusCheckProcess === HttpStatus.Idle) {
      dispatch(fetchServerStatus());
    }
  }, [serverStatusCheckProcess, dispatch]);

  useEffect(() => {
    if (serverStatus) {
      messageApi.open({
        type: "success",
        content: "Server is working",
        duration: 3,
      });
    }
    if (!serverStatus && serverError) {
      messageApi.open({
        type: "error",
        content: serverError?.message,
        duration: 3,
      });
    }
  }, [serverStatus, serverError]);
  return (
    <>
      <Spin
        spinning={serverStatusCheckProcess === HttpStatus.Loading}
        size="large"
        fullscreen={true}
      />
      {contextHolder}
      <BeforeRouterEnter />
    </>
  );
}

export default App;
