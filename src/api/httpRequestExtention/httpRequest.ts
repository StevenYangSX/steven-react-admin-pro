import axiosInstance from "@/utils/axiosInstance";
import { ExtendedAxiosResponse } from "@/types/systemDataTypes";
function HttpRequest<T,D>(config:any) : Promise<ExtendedAxiosResponse<T,D>> {
    return axiosInstance(config) as Promise<ExtendedAxiosResponse<T,D>>
}

export default HttpRequest;