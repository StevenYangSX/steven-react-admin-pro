import axiosInstance from "@/utils/axiosInstance";
import { ExtendedAxiosResponse } from "@/types/systemDataTypes";
function HttpRequest<T>(config:any) : Promise<ExtendedAxiosResponse<T>> {
    return axiosInstance(config) as Promise<ExtendedAxiosResponse<T>>
}

export default HttpRequest;