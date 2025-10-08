import { type AppDispatch } from "../redux/store";
import { showSpinner, hideSpinner } from "../redux/features/spinner.slice";
import { message } from "antd";
import type { AxiosResponse } from "axios";
import type { ApiResponse, HandleOptions } from "../interfaces/components.interface";
import { logout } from "../redux/features/auth.slice";
import { handleApiError } from "./error-handler";

export async function handleRequestAxios<T>(
  dispatch: AppDispatch,
  apiCall: () => Promise<AxiosResponse<ApiResponse<T>>>,
  options: HandleOptions = {}
): Promise<ApiResponse<T> | null> {
  const { showSpinner: show = true, successMessage, errorMessage, showMessageApi } = options;

  try {
    if (show) dispatch(showSpinner());

    const response = await apiCall();
    const result = response.data;

    if (result?.success) {
      if (successMessage) message.success(successMessage);
      if (showMessageApi && result.message) message.success(result.message);
    } else {
      if (errorMessage) message.error(errorMessage);
      if (showMessageApi && (result?.message || (result?.error && typeof result?.error === "string"))) {
        message.error(result.message || String(result?.error));
      }
    }

    return result;
  } catch (err: any) {
    console.error(err);
    
    const status = err.response?.status;
    const serverMessage = err.response?.data?.message;
    const serverErrors = err.response?.data?.error?.errors;
    const errorMessage = err.message;

    handleApiError({
      status: status || 500,
      serverMessage,
      errorMessage,
      serverErrors,
      onUnauthorized: () => dispatch(logout())
    });

    return null;
  } finally {
    if (show) dispatch(hideSpinner());
  }
}
