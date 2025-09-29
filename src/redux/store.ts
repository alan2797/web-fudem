import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth.slice";
import spinnerReducer from "./features/spinner.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    spinner: spinnerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
