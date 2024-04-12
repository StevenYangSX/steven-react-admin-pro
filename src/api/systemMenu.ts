import { AddSystemMenuItemRequestType } from "@/types/requestDataTypes";
import HttpRequest from "@/utils/httpRequest";

export const getSystemMenusApi = () => {
  return HttpRequest({
    url:"/systemMenu/menuList",
    method: "get",
  });
};

export const addMenuItemApi = (menuItem:AddSystemMenuItemRequestType) =>{
  return HttpRequest({
    url:"/systemMenu/addMenu",
    method:"post",
    data:menuItem
  })
}