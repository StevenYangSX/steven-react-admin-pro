import { getUserAccessListRequestType } from "@/types/requestDataTypes";
import HttpRequest from "@/utils/httpRequest";

export const getUserAuthorizationApi = (payload:getUserAccessListRequestType) => {
    return HttpRequest({
      url:"/user/userAccess",
      method:"post",
      data:payload
    })
  }