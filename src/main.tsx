import { StrictMode } from "react";
import { BrowserRouter } from "react-router";
import { createRoot } from "react-dom/client";
import App from "@/app/App.tsx";
import { ErrorBoundary, StoreProvider, ThemeProvider } from "./app/providers";

import "@/app/styles/index.scss";
import "@/shared/config/i18n/i18n";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </ThemeProvider>
      </BrowserRouter>
    </StoreProvider>
  </StrictMode>
);
