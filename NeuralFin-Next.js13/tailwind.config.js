/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './sections/**/*.{html,js,jsx, ts, tsx}',
    './styles/**/*.{js,jsx, ts, tsx}',
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  mode: 'jit',
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary-black': '#1A232E',
        'secondary-white': '#c7c7c7',
      },
      transitionTimingFunction: {
        'out-flex': 'cubic-bezier(0.05, 0.6, 0.4, 0.9)',
      },
      keyframes: {
        blob1: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(130px, -50px) scale(1.2)' },
          '66%': { transform: 'stranslate(-15px, 22px) cale(0.8)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        blob2: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(-130px, -50px) scale(1.2)' },
          '66%': { transform: 'stranslate(-13px, 10px) cale(0.8)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        blob3: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(-130px, 0px) scale(1.2)' },
          '66%': { transform: 'stranslate(-30px, 350px) cale(0.8)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        blob4: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(130px, 0px) scale(1.2)' },
          '66%': { transform: 'stranslate(-20px, 20px) cale(0.8)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },


      },
      animation: {
        blob1: 'blob1 7s infinite',
        blob2: 'blob2 6s infinite',
        blob3: 'blob3 7s infinite',
        blob4: 'blob4 5s infinite',


      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar-hide'),
  ],
};
