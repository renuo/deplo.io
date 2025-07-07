import { paraglide } from '@inlang/paraglide-sveltekit/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

if (!process.env.VITE_GOOGLE_TAG_ID) {
  console.warn('Google Tag Id not specified');
}

export default defineConfig({
  plugins: [
    sveltekit(),
    paraglide({
      project: './project.inlang',
      outdir: './src/lib/paraglide',
    }),
  ],
  server: {
    port: 3001,
    host: true,
  },
});
