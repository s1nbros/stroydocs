// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // TODO: replace with the production domain once it is registered
  site: "https://stroydocs.bg",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap()],
});
