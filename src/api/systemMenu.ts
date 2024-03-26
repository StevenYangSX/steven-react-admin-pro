import HttpRequest from "@/utils/httpRequest";

export const getSystemMenusApi = () => {
  return HttpRequest({
    url:"/systemMenu/menuList",
    method: "get",
  });
};