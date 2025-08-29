import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
   optimizeDeps: {
    include: [
      "@mui/icons-material/Save",
      "@mui/icons-material/RestartAlt",
      "@mui/icons-material/AddPhotoAlternate",
      "@mui/icons-material/Close"
    ],
  },
  // server: {
  //   proxy: {
  //     '/api': 'http://localhost:4000',
  //   },
  // },
});