/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-blue': '#2BA2E5',
        'dark-magenta': '#92278F',
        'light-grey': '#EFEFEF',
        'dark-grey': '#686868',

      }
    },
  },
  plugins: [],
}

