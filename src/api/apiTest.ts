import HttpRequest from "@/utils/httpRequest";

export const testApi = (data: number = 1) => {
  return HttpRequest({
    url: `/${data}`,
    method: "get",
  });
};
