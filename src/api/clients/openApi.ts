import { OpenApiError } from "@/errors/api/OpenApiError";
import { OpenApiErrorResponse } from "@/models/api/open/OpenApiErrorResponse";
import { OpenApiResponse } from "@/models/api/open/OpenApiResponse";
import { isObject } from "@/utils/object";
import { AxiosError, CancelToken } from "axios";

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
