import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api/products": {
        target: "http://localhost:8082",
        changeOrigin: true
      },
      "/api/categories": {
        target: "http://localhost:8082",
        changeOrigin: true
      },
      "/api/orders": {
        target: "http://localhost:8083",
        changeOrigin: true
      },
      "/api/deliveries": {
        target: "http://localhost:8085",
        changeOrigin: true
      },
      "/health/product": {
        target: "http://localhost:8082",
        changeOrigin: true,
        rewrite: () => "/actuator/health"
      },
      "/health/order": {
        target: "http://localhost:8083",
        changeOrigin: true,
        rewrite: () => "/actuator/health"
      },
      "/health/notification": {
        target: "http://localhost:8084",
        changeOrigin: true,
        rewrite: () => "/actuator/health"
      },
      "/health/shipping": {
        target: "http://localhost:8085",
        changeOrigin: true,
        rewrite: () => "/actuator/health"
      },
      "/eureka": {
        target: "http://localhost:8761",
        changeOrigin: true
      }
    }
  }
});
