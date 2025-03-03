/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmos: {
          DEFAULT: '#9333ea',
          light: '#a855f7',
          dark: '#7e22ce'
        },
        cyan: {
          500: '#06b6d4'
        }
      },
      backgroundImage: {
        'cosmos-gradient': 'linear-gradient(to right, var(--tw-gradient-stops))'
      }
    },
  },
  plugins: [],
}
