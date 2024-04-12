import axios from "axios";


axios.defaults.validateStatus = customValidateStatus;

import Setting from "@/setting";
import customValidateStatus from "./customValidateStatus";
import { store } from "@/store";
// 创建一个 axios 实例
const service = axios.create({
  // baseURL: Setting.apiBaseURL,
  baseURL: Setting.apiStagingURL,
  timeout: 10000, // 请求超时时间

});

// 请求拦截器
service.interceptors.request.use(
  async (config) => {
    let currentUserInfo = store.getState().userInfoReducer.userInfo
    if(currentUserInfo) {
        config.headers['Authorization'] = 'Bearer ' + store.getState().userInfoReducer.token
    }
    return config;
  },
  (error) => {
    // 发送失败
    Promise.reject(error);
  }
);
// 响应拦截器
service.interceptors.response.use(
  (response) => {
    console.log("dfdfdf",response)
    const code = response.status;
    const ApiStatusCode = response.data.statusCode;
    switch (ApiStatusCode) {
      case 200:
        return response.data;
      // [ 示例 ] code === 0 代表没有错误
      case 400:
        return Promise.reject(response.data || { msg: "未知错误" });
      case 40000:
      case 400001:
      case 400011:
      case 400012:
        //return Promise.reject(response.data || { msg: "未知错误" });
        return Promise.reject(response.data || { msg: "未知错误" });
      // [ 示例 ] 其它和后台约定的 code
      // errorCreate(response.data.msg);
      // break;
      case 410000:
      case 410001:
      case 410002:
      case 410003:
      default:
        break;
    }
  },
  (error) => {
    console.log("eeeee",error)
    if (error && !error.response) {
      return Promise.reject(error);
    }
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          return Promise.reject(error.response.data);
          break;
        case 40000:
          error.message = "未授权，请登录";
          break;
        case 403:
          error.message = "拒绝访问";
          break;
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`;
          break;
        case 408:
          error.message = "请求超时";
          break;
        case 500:
          error.message = "服务器内部错误";
          break;
        case 501:
          error.message = "服务未实现";
          break;
        case 502:
          error.message = "网关错误";
          break;
        case 503:
          error.message = "服务不可用";
          break;
        case 504:
          error.message = "网关超时";
          break;
        case 505:
          error.message = "HTTP版本不受支持";
          break;
        default:
          break;
      }
    }
  }
);

export default service;
