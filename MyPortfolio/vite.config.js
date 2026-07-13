import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import devtools from "solid-devtools/vite";
import { resolve } from "path";

export default defineConfig({
  assetsInclude: ["**/*.lottie"],
  plugins: [devtools(), solidPlugin(), tailwindcss()],
  resolve: {
    alias: {
      "~": resolve(__dirname, "src"),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
});
