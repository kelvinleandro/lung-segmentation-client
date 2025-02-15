import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ApiProvider } from "./context/api-context.tsx";
import "./index.css";
import { LanguageProvider } from "./context/language-context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApiProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ApiProvider>
  </React.StrictMode>
);
