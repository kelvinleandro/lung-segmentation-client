import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ApiProvider } from "./context/api-context.tsx";
import { ParametersProvider } from "./context/parameters-context.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApiProvider>
      <ParametersProvider>
        <App />
      </ParametersProvider>
    </ApiProvider>
  </React.StrictMode>
);
