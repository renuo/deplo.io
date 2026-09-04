import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        deploio: '#141D50',
        hero: '#898EA7',
        mountain: '#FCFAFA',
        background: '#EAE9E8',
        claude: '#D97757',
      },
      backgroundImage: {
        team: 'linear-gradient(#FFFFFF 0%, #EAE9E8 100%)',
      },
    },
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
      slack: ['Lato', 'sans-serif'],
      mono: ['Fira Code', 'monospace'],
    },
  },
  plugins: [forms],
} satisfies Config;
