import axios from "axios";
import { statusCodes } from "./statusCodes";
import { BASE_URL } from "@env";
import { showToast } from "@/components/Toast/showToast";

const endpoint = (url: string) => url.split("/").at(-1);

axios.defaults.timeout = 15000;
export const apiInstance = axios.create({
  baseURL: BASE_URL,
});

apiInstance.interceptors.response.use(
  async (result) => {
    // console.log(result.status, "status", result.statusText, "main response");

    return result;
  },
  async (result) => {
    if (result.response) {
      const error = result.response;

      const { status, data }: any = error;

      if (status >= statusCodes.SERVER_ERROR_HTTP_CODE) {
        const serverError =
          "Currently unable to process your request. Please try again";

        showToast({
          message: "Currently unable to process your request. Please try again",
          type: "info",
        });

        throw { statusText: serverError } as any;
      }

      const responseMsg: any = data?.message;
      console.log(data, "==data", status);

      if (!responseMsg) {
        const serverError =
          "Currently unable to process your request. Please try again later";

        showToast({
          message: "Currently unable to process your request. Please try again",
          type: "info",
        });

        return { statusText: serverError };
      }

      if (status >= 400 || status <= 499) {
        switch (status) {
          case statusCodes.BAD_REQUEST_HTTP_CODE: {
            showToast({
              message: responseMsg,
              type: "danger",
            });
          }

          case 417: {
            showToast({
              message: responseMsg,
              type: "danger",
            });
          }

          default: {
            if (typeof responseMsg !== "string") {
              const unhandledError =
                "Currently unable to process your request. Please try again";

              throw { responseMsg: unhandledError } as any;
            }

            throw responseMsg;
          }
        }
      }

      const unhandledError =
        "Currently unable to process your request. Please try again";

      showToast({
        message: "Currently unable to process your request. Please try again",
        type: "info",
      });

      throw { responseMsg: unhandledError } as any;
    }

    throw {
      responseMsg:
        "Couldn't perform your request. Please make sure your phone has an Internet connection and try again",
    } as any;
  },
);

apiInstance.interceptors.request.use(
  async (request) => {
    // request.headers.set("content-type", `application/json`);

    return request;
  },
  (error) => Promise.reject(error),
);
