import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Replace <repository-name> with your actual repository name
export default defineConfig({
  plugins: [react()],
  base: "/",
});
