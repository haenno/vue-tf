/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class' /* or 'media' or 'class' */,
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}',
    './node_modules/flowbite/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {}
  },
  plugins: [require('flowbite/plugin')]
}
