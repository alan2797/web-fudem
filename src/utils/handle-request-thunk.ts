import { type AppDispatch } from "../redux/store";
import { showSpinner, hideSpinner } from "../redux/features/spinner.slice";
import { message } from "antd";
import type { ApiResponse, HandleOptions } from "../interfaces/components.interface";

export async function handleRequestThunk<T>(
  dispatch: AppDispatch,
  thunkAction: () => Promise<ApiResponse<T>>,
  options: HandleOptions = {}
): Promise<ApiResponse<T> | null> {
  const { showSpinner: show = true, successMessage, errorMessage, showMessageApi } = options;

  try {
    if (show) dispatch(showSpinner());

    const result = await thunkAction();
    if(result && result.success){

      console.log(result);
      if (successMessage) message.success(successMessage);
      if(showMessageApi && result.message) message.success(result.message); 
    }else{
      console.log(result);
      if (errorMessage) message.error(errorMessage);
      if (
        showMessageApi &&
        (result?.message || (result?.error && typeof result?.error === "string"))
      ) {
        message.error(result.message || String(result?.error));
      }
    }

    return result;
  } catch (err: any) {
    console.error(err);
    const status = err.response?.status ?? 0;
    const serverMessage = err.response?.data?.message;

    switch (status) {
      case 401:
        message.error(serverMessage || "No autorizado. Por favor inicia sesión nuevamente.");
        break;
      case 404:
        message.error("Recurso no encontrado.");
        break;
      case 0:
        message.error("No se pudo conectar con el servidor. Verifique su conexión a internet.");
        break;
      default:
        message.error(errorMessage || serverMessage || "Ocurrió un error inesperado.");
        break;
    }

    return null;
  } finally {
    if (show) dispatch(hideSpinner());
  }
}
