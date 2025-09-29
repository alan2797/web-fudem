import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConfigProvider } from "antd";
import "./index.css";
import "antd/dist/reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import Spinner from "./components/spinner/spinner.component.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#046cb4", // tu color primary personalizado
            borderRadius: 6, // bordes redondeados (opcional)
          },
        }}
      >
        <App />
        <Spinner />
      </ConfigProvider>
    </Provider>
  </StrictMode>
);
