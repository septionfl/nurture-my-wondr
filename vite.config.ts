import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tanstackStart(),
    // Masukkan Nitro dan paksa menjadi format Vercel
    nitro({
      preset: "vercel"
    }),
    react(),
  ],
});