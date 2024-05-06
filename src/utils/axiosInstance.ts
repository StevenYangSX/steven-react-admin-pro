import axios from "axios";
import Setting from "@/setting";
import customValidateStatus from "./customValidateStatus";

axios.defaults.validateStatus = customValidateStatus;
// 创建一个 axios 实例
const axiosInstance = axios.create({
  baseURL: Setting.apiBaseURL,
  timeout: 3000, // 请求超时时间

});



export default axiosInstance;
