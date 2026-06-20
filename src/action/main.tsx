import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PluginGate } from "../PluginGate";
import { ActionMenu } from "./Action";
import "../tailwind.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PluginGate>
      <ActionMenu />
    </PluginGate>
  </StrictMode>,
);
