import HttpRequest from "./httpRequestExtention/httpRequest";


export const serverHealthCheckApi = () => {
  return HttpRequest({
    url:"/health",
    method: "get",
  });
};


export const serverAuthCheck = () => {
  return HttpRequest({
    url:"/health/auth",
    method: "get",
  });
};
