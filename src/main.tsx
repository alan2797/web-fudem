import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import Spinner from "./components/spinner/spinner.component.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#006eb5", // tu color primary personalizado
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
