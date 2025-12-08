import { defineConfig } from "vite";

export default defineConfig({
  root: "docs",
  build: {
    outDir: "../dist",   // Put final build one folder above
    emptyOutDir: true
  }
});
