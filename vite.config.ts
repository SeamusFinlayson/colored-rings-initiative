import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";

import { cloudflare } from "@cloudflare/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    cloudflare()
  ],
  server: {
    cors: {
      origin: "https://www.owlbear.rodeo",
    },
  },
  build: {
    rolldownOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        background: resolve(__dirname, "background.html"),
        action: resolve(__dirname, "action.html"),
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});