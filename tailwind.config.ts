import forms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      colors: {
        primary: '#141D50',
        mountain: '#FCFAFA',
        background: '#EAE9E8',
      },
    },
  },

  plugins: [forms],
} satisfies Config;
