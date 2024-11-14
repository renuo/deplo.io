import forms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        deploio: '#141D50',
        mountain: '#FCFAFA',
        background: '#EAE9E8',
      },
    },
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
      mono: ['Fira Code', 'monospace'],
    },
  },
  plugins: [forms],
} satisfies Config;
