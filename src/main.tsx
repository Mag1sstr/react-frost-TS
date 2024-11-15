import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import AuthContextProvider from "./contexts/Auth/AuthContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthContextProvider>
  </StrictMode>
);
