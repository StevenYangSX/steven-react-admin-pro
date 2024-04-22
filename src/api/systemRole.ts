import { SystemRoleListResponseType } from "@/types/systemDataTypes";
import HttpRequest from "./httpRequestExtention/httpRequest";
import { AddSystemRoleRequestType, DeleteSystemRoleRequestType, ModifySystemRoleRequestType } from "@/types/requestDataTypes";

export const getSystemRolesApi = () => {
  return HttpRequest<SystemRoleListResponseType[]>({
    url:"/systemRole/roleList",
    method: "get",
  });
};


export const addSystemRoleApi = (data:AddSystemRoleRequestType) => {
  return HttpRequest({
    url:"/systemRole/addRole",
    method: "post",
    data
  });
}

export const deleteSystemRoleApi = (data:DeleteSystemRoleRequestType) => {
  return HttpRequest({
    url:"/systemRole/deleteRole",
    method: "post",
    data
  });
}

export const modifySystemRoleApi = (data:ModifySystemRoleRequestType) => {
  return HttpRequest({
    url:"/systemRole/modifyRole",
    method: "post",
    data
  });
}






