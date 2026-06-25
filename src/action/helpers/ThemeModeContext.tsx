import { createContext } from "react";

export const ThemeModeContext = createContext<"DARK" | "LIGHT">("DARK");
