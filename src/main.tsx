import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { TodosProvider } from "./context-provider/TodosProvider.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <TodosProvider>
        <App />
      </TodosProvider>
    </Provider>
  </StrictMode>
);
