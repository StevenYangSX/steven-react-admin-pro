import {  PageableRequestType } from "@/types/requestDataTypes";
import HttpRequest from "./httpRequestExtention/httpRequest";
import { PageableResponse } from "@/types/responseDataTypes";
import { SystemCustomerType, SystemPageableSortType, SystemPageableType } from "@/types/systemDataTypes";
export const getCustomerListApi = (payload:PageableRequestType) => {
    return HttpRequest<PageableResponse<SystemCustomerType[],SystemPageableType,SystemPageableSortType>>({
      url:"/customer/getCustomerList",
      method:"post",
      data:payload
    })
  }
