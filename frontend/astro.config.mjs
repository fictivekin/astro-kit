// @ts-check
import { defineConfig } from "astro/config";

import solidJs from "@astrojs/solid-js";
import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL || "http://localhost:4321",
  output: "server",
  adapter: netlify(),
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
