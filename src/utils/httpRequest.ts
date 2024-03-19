import axios from "axios";

import Setting from "@/setting";
// 创建一个 axios 实例
const service = axios.create({
  // baseURL: Setting.apiBaseURL,
  baseURL: Setting.apiStagingURL,
  timeout: 10000, // 请求超时时间

});

// 请求拦截器
service.interceptors.request.use(
  async (config) => {
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
    const code = response.status;
    switch (code) {
      case 200:
        return response.data;
      // [ 示例 ] code === 0 代表没有错误

      case 40000:
      case 400011:
      case 400012:
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

    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = "请求错误";
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
