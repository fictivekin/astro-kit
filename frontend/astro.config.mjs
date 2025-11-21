// @ts-check
import { defineConfig } from "astro/config";

import solidJs from "@astrojs/solid-js";
import node from "@astrojs/node";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "http://localhost:4321", // Replace with your actual domain
  output: "server",
  adapter: node({ mode: "standalone" }),
  integrations: [
    solidJs(),
    sitemap({
      filter: (page) => !page.includes("/preview"),
    }),
  ],
  image: {
    domains: ["cdn.sanity.io"],
  },
  vite: {
    resolve: {
      alias: {
        "@/components": "/src/components",
        "@": "/src",
      },
    },
  },
});
