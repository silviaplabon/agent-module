// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  base: "/crm/agent",
  server: {
    //   // host: "::",
    port: 8083,
  },
  preview: {
    port: 8083,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "build",
    target: "esnext",

    rollupOptions: {},
  },
}));
