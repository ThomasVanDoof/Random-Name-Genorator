import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  base: "/Random-Name-Genorator/",
  build: {
    outDir: "../docs",
    emptyOutDir: true
  }
});

