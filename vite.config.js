import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "",
  resolve: {
    alias: {
      "@": path.resolve("./src"),
      "@app": path.resolve("./src/app"),
      "@utils": path.resolve("./src/utils"),
      "@assets": path.resolve("./src/assets"),
    },
  },
})
