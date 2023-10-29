/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        'primary': '#F4F4F9',
        'secondary': '#D6E8E9',
        'text': '#0D1B1E',
        'button_1': '#B8DBD9',
        'button_2': '#1F363D',
        'button_3': '#0D1B1E',
      }
    },
  },
  plugins: [],
}

