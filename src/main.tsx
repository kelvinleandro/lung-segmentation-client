import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ApiProvider } from "./context/api-context.tsx";
import { LanguageProvider } from "./context/language-context";
import { ThemeProvider } from "./context/theme-context";
import { ParametersProvider } from "./context/parameters-context.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LanguageProvider>
      <ThemeProvider>
        <ApiProvider>
          <ParametersProvider>
            <App />
          </ParametersProvider>
        </ApiProvider>
      </ThemeProvider>
    </LanguageProvider>
  </React.StrictMode>
);