import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

export default defineConfig({
  plugins: [react()],
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
