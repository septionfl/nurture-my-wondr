import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { TanStackStartVite } from "@tanstack/start/plugin";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    TanStackStartVite({
      server: {
        preset: "vercel", // Sekarang perintah ini tidak akan diblokir lagi
      },
    }),
    react(),
  ],
});