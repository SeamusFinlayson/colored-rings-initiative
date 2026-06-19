import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PluginGate } from "../PluginGate";
import { ActionMenu } from "./ActionMenu";
import "../tailwind.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PluginGate>
      <ActionMenu />
    </PluginGate>
  </StrictMode>,
);
