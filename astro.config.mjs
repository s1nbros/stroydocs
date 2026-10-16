// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://stroydocs.net",
  // One URL form per page, matching the sitemap and canonical links
  trailingSlash: "always",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap(), react()],
});