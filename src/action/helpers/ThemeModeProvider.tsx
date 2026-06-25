import OBR, { type Theme } from "@owlbear-rodeo/sdk";
import { useEffect, useState } from "react";
import { ThemeModeContext } from "./ThemeModeContext";

const setBodyTheme = (string: string) => {
  if (string === "DARK") document.body.classList.add("dark", "scheme-dark");
  else document.body.classList.remove("dark", "scheme-dark");
};

const fromUrl = new URLSearchParams(document.location.search).get("themeMode");

/** Keep tailwind theme up to date by applying the "dark" class to the document body. */
export function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  // Add theme early if provided in url
  if (fromUrl !== null) setBodyTheme(fromUrl);

  const [themeMode, setThemeMode] = useState<"DARK" | "LIGHT">("DARK");

  const handleTheme = (theme: Theme) => {
    setThemeMode(theme.mode);
    setBodyTheme(theme.mode);
  };

  // Keep up to date with owlbear rodeo theme when it is available
  useEffect(() => {
    OBR.theme.getTheme().then(handleTheme);
    return OBR.theme.onChange(handleTheme);
  }, []);

  return <ThemeModeContext value={themeMode}>{children}</ThemeModeContext>;
}
