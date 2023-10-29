/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        'primary': '#052F5F',
        'secondary': '#005377',
        'text': '#FFEAEE',
        'button': '#06A77D',
      }
    },
  },
  plugins: [],
}

