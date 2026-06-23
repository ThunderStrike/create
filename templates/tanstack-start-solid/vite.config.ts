import contentCollections from '@content-collections/vite';
import { tanstackStart } from '@tanstack/solid-start/plugin/vite';
import tailwindcss from '@tailwindcss/vite';
import { FontaineTransform } from 'fontaine';
import Icons from 'unplugin-icons/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import { defineConfig } from 'vite';
import viteSolid from 'vite-plugin-solid';

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    // Content Collections must run before the framework plugins so generated
    // collection imports are ready for TanStack Start route modules.
    contentCollections(),

    tanstackStart(),

    tailwindcss(),

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
  ],
});
