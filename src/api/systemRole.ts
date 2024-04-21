import { SystemRoleListResponseType } from "@/types/systemDataTypes";
import HttpRequest from "./httpRequestExtention/httpRequest";

export const getSystemRolesApi = () => {
  return HttpRequest<SystemRoleListResponseType[]>({
    url:"/systemRole/roleList",
    method: "get",
  });
};