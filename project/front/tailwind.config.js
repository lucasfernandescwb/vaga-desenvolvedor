/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'neo': '4px 6px 0 rgb(39, 39, 42);'
      },
    },
  },
  plugins: [],
}
