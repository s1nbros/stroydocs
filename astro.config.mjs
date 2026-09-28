// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  // TODO: replace with the production domain once it is registered
  site: "https://stroydocs.bg",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap(), react()],
});