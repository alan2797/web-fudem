import { type AppDispatch } from "../redux/store";
import { showSpinner, hideSpinner } from "../redux/features/spinner.slice";
import { message } from "antd";

interface HandleOptions {
  showSpinner?: boolean;
  successMessage?: string;
  errorMessage?: string;
}

export async function handleRequest<T>(
  dispatch: AppDispatch,
  thunkAction: () => Promise<T>,
  options: HandleOptions = {}
): Promise<T | null> {
  const { showSpinner: show = true, successMessage, errorMessage } = options;

  try {
    if (show) dispatch(showSpinner());
;
    const result = await thunkAction();

    if (successMessage) message.success(successMessage);

    return result;
  } catch (err) {
    console.error(err);
    if (errorMessage) message.error(errorMessage);
    return null;
  } finally {
    if (show) dispatch(hideSpinner());
  }
}
