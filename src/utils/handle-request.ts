import { type AppDispatch } from "../redux/store";
import { showSpinner, hideSpinner } from "../redux/features/spinner.slice";
import { message } from "antd";
import type { ApiResponse } from "../interfaces/components.interface";

interface HandleOptions {
  showSpinner?: boolean;
  successMessage?: string;
  errorMessage?: string;
  showMessageApi?: boolean
}

export async function handleRequest<T>(
  dispatch: AppDispatch,
  thunkAction: () => Promise<ApiResponse<T>>,
  options: HandleOptions = {}
): Promise<ApiResponse<T> | null> {
  const { showSpinner: show = true, successMessage, errorMessage, showMessageApi } = options;

  try {
    if (show) dispatch(showSpinner());
;
    const result = await thunkAction();
    console.log(result);
    if (successMessage) message.success(successMessage);
    if(showMessageApi && result.message) message.success(result.message); 

    return result;
  } catch (err) {
    console.error(err);
    if (errorMessage) message.error(errorMessage);
    return null;
  } finally {
    if (show) dispatch(hideSpinner());
  }
}
