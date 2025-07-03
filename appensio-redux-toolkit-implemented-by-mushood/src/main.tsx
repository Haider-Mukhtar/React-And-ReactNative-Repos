import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import "@/assets/css/index.css";

import App from "./app.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import store, { persistor } from "./store/index.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster richColors={true} duration={1500} />
          <App />
        </TooltipProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
