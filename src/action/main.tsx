import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PluginGate } from "../PluginGate";
import { App } from "./App";
import "../tailwind.css";
import { ThemeModeProvider } from "./helpers/ThemeModeProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PluginGate>
      <ThemeModeProvider>
        <App />
      </ThemeModeProvider>
    </PluginGate>
  </StrictMode>,
);
