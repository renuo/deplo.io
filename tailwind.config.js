/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './_includes/**/*.html', './_layouts/**/*.html', './_i18n/**/*.yml', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        deploio: {
          DEFAULT: '#141D50',
          shadow: '#141D501A',
        },
        hero: '#898EA7',
        mountain: '#FCFAFA',
        background: '#EAE9E8',
        claude: '#D97757',
        news: '#3D3D3A',
        link: '#476DCC',
        terminal: {
          red: '#FA6058',
          yellow: '#FABD2E',
          green: '#27CA41',
        },
      },
      backgroundImage: ({ theme }) => ({
        team: `linear-gradient(${theme('colors.white')} 0%, ${theme('colors.background')} 100%)`,
      }),
      boxShadow: ({ theme }) => ({
        card: `0 30px 40px 0 ${theme('colors.deploio.shadow')}`,
      }),
      animation: {
        marquee: 'marquee 36s linear infinite',
        'marquee-fast': 'marquee 18s linear infinite',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-25%)' },
        },
      },
    },
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
      slack: ['Lato', 'sans-serif'],
      mono: ['Fira Code', 'monospace'],
    },
  },
};
