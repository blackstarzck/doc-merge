import process from "node:process"

import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // mode에 따라 .env 파일 로드 (예: development, production)
  const env = loadEnv(mode, process.cwd(), "VITE_")

  return {
    plugins: [react(), tailwindcss()],
    base: "./",
    server: {
      port: env.VITE_PORT ? parseInt(env.VITE_PORT) : 3000,
    },
  }
})
