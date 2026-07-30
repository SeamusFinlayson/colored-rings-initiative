import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PluginGate } from "../PluginGate";
import { App } from "./App";
import "../tailwind.css";
import { ThemeModeProvider } from "./helpers/ThemeModeProvider";
import { RoomDataProvider } from "./helpers/roomData/RoomDataProvider";
import { PlayerSelectionProvider } from "./helpers/playerSelection/PlayerSelectionProvider";
import { InitiativeStateProvider } from "./helpers/initiativeState/initiativeStateProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PluginGate>
      <ThemeModeProvider>
        <RoomDataProvider>
          <PlayerSelectionProvider>
            <InitiativeStateProvider>
              <App />
            </InitiativeStateProvider>
          </PlayerSelectionProvider>
        </RoomDataProvider>
      </ThemeModeProvider>
    </PluginGate>
  </StrictMode>,
);
