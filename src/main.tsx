import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { store } from "./store/store.ts";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClinet = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClinet}>

      <Provider store={store}>
        <Toaster richColors />
        <App />
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
