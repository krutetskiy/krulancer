/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      
    },
    extend: {
      colors: {
        'bg-gray-regular': '#F6F6F6',
        'gray-task': '#E0E4EA' ,
        'gray-light': '#6C6C6C',
        'low-priority': '#67CB65',
        'medium-priority': '#FF9533',
        'hign-priority': '#E74444'
      },
    },
  },
  plugins: [],
};
