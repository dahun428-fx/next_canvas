import { OpenApiErrorResponse } from "@/models/api/open/OpenApiErrorResponse";
import { OpenApiResponse } from "@/models/api/open/OpenApiResponse";
import { isObject } from "@/utils/object";
import axios, { AxiosError, AxiosResponse, CancelToken } from "axios";
import { createAxios, validateStatus } from "./utils/createAxios";
import { OpenApiRequest } from "@/models/api/open/OpenApiRequest";
import { OpenApiError } from "@/errors/api/OpenApiError";

const timeout = 3000;

type RequestOption = {
  cancelToken?: CancelToken;
};

function handleError(error: AxiosError) {
  if (isOpenApiErrorResponse(error.response?.data)) {
    throw new OpenApiError(error);
  }
}

function isOpenApiErrorResponse(response: unknown): response is OpenApiErrorResponse {
  if (response == null) {
    return true;
  }
  if (!isObject<OpenApiErrorResponse>(response)) {
    return false;
  }

  return !!response.status;
}

const generateApi = () => {
  const $axios = createAxios(
    {
      baseURL: ``,
      timeout,
      handleError,
      validateStatus,
    },
    {
      shouldSendApiLog: true,
    }
  );

  async function get<T extends OpenApiRequest, R extends OpenApiResponse>(url: string, request?: T, options?: RequestOption): Promise<R> {
    return $axios
      .get(url, {
        params: { ...request },
        cancelToken: options?.cancelToken,
      })
      .then((response) => response.data);
  }

  async function post<T extends OpenApiRequest, R extends OpenApiResponse>(url: string, request: T, options?: RequestOption): Promise<R> {
    return $axios
      .post<T, AxiosResponse<R>>(url, request, {
        cancelToken: options?.cancelToken,
      })
      .then((response) => response.data);
  }

  async function put<T extends OpenApiRequest, R extends OpenApiResponse>(url: string, request: T, options?: RequestOption): Promise<R> {
    return $axios.put(url, request, { cancelToken: options?.cancelToken }).then((response) => response.data);
  }

  async function _delete<T extends OpenApiRequest, R extends OpenApiResponse>(url: string, request?: T, options?: RequestOption): Promise<R> {
    return $axios
      .delete(url, {
        params: { ...request },
        cancelToken: options?.cancelToken,
      })
      .then((response) => response.data);
  }

  return { get, post, put, _delete };
};

export const openApi = generateApi();
