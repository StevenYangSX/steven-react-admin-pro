import HttpRequest from "@/utils/httpRequest";

export const serverHealthCheck = () => {
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
