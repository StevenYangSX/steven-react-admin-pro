import { AddSystemUserRequestType, DeleteSystemUserRequestType, UpdateSystemUserRequestType, getUserAccessListRequestType } from "@/types/requestDataTypes";
import HttpRequest from "./httpRequestExtention/httpRequest";
import { SystemAdminUserDataType } from "@/types/systemDataTypes";

export const getUserAuthorizationApi = (payload:getUserAccessListRequestType) => {
    return HttpRequest({
      url:"/user/userAccess",
      method:"post",
      data:payload
    })
  }



export const getSystemAdminUserListApi = () =>{
  return HttpRequest<SystemAdminUserDataType[]>({
    url:"/user/userList",
    method:"get",
  })
}


export const addSystemUserApi = (data:AddSystemUserRequestType) => {
  return HttpRequest<SystemAdminUserDataType>({
    url:"/user/addAdminUser",
    method: "post",
    data
  });
};

export const deleteSystemUserApi = (data:DeleteSystemUserRequestType) => {
  return HttpRequest({
    url:"/user/deleteAdminUser",
    method: "post",
    data
  });
};

export const updateSystemUserApi = (data:UpdateSystemUserRequestType) => {
  return HttpRequest({
    url:"/user/updateAdminUser",
    method: "post",
    data
  });
};







