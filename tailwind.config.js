/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './_includes/**/*.html',
    './_layouts/**/*.html',
  ],
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
};
