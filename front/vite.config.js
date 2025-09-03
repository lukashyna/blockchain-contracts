import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    base: "/",
    preview: {
      port: env.PORT || 3000,
      host: true,
      allowedHosts: ["*"],
    },
  };
});
