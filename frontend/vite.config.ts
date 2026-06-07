
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from 'nitro/vite'

export default defineConfig({
  cloudflare: (process.env.VERCEL === "1" || !!process.env.NETLIFY) ? false : undefined,
   plugins: [
    nitro({
      preset: 'vercel', // This tells Nitro to build for Vercel
    }),
  ],
  tanstackStart: {
    server: { entry: "server" },
  },
});
