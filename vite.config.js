import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  build: {
    outDir: "../dist",   // Put final build one folder above
    emptyOutDir: true
  }
});
