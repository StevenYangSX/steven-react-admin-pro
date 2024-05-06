
import HttpRequest from "./httpRequestExtention/httpRequest";

export const updateSseStatus = (param:string) => {
    return HttpRequest<string>({
      url:`/sse/updateStatus?newData=${param}`,
      method: "get"
    });
  };