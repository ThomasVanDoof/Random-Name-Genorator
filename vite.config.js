import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  base: "/Random-Name-Genorator/",
  build: {
    outDir: "../dist",
    emptyOutDir: true
  }
});