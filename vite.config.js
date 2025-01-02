import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Port 3000 olarak ayarlandı
    proxy: {
      "/assets": {
        target: "http://localhost:3000", // Proxy için port 3000
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/assets/, "/src/assets"),
      },
    },
  },
});

