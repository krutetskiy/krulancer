/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {

    },
    extend: {
      colors: {
        'gray-regular-1': '#F6F6F6',
        'gray-regular-2': '#E0E4EA',
        'gray-regular-3': '#D9E5F9',
        'gray-light-1': '#6C6C6C',
        'green-regular-1': '#67CB65',
        'orange-regular-1': '#FD633D',
        'low-priority': '#67CB65', // deprecated
        'medium-priority': '#FF9533',
        'hign-priority': '#E74444'
      },
    },
  },
  plugins: [],
};
