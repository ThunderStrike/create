import { contentCollections } from '@content-collections/vite';
import { tanstackStart } from '@tanstack/solid-start/plugin/vite';
import tailwindcss from '@tailwindcss/vite';
import { FontaineTransform } from 'fontaine';
import { nitro } from 'nitro/vite';
import Icons from 'unplugin-icons/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import { defineConfig } from 'vite';
import viteSolid from 'vite-plugin-solid';

const siteOrigin = process.env.VITE_SITE_ORIGIN ?? 'http://localhost:3000';

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    // Content Collections must run first so generated content imports are ready
    // before Start scans and transforms route modules.
    contentCollections(),

    tailwindcss(),

    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
      },
      sitemap: {
        enabled: true,
        host: siteOrigin,
      },
    }),

    FontaineTransform.vite({
      fallbacks: ['BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'Arial', 'Noto Sans'],
      resolvePath: (id) => {
        if (id.startsWith('/fonts/')) {
          return new URL(`./public${id}`, import.meta.url).href;
        }

        return id;
      },
    }),

    Icons({
      compiler: 'solid',
      customCollections: {
        local: FileSystemIconLoader('./src/icons'),
      },
    }),

    // Solid's Vite plugin must run after TanStack Start's Vite plugin.
    viteSolid({ ssr: true }),

    // Current TanStack Start Solid examples include Nitro as the deploy/runtime
    // server layer when using the Vite plugin.
    nitro(),
  ],
});
