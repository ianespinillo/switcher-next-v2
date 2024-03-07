/** @type {import('tailwindcss').Config} */
const withTM = require('@material-tailwind/react/utils/withMT')
module.exports = withTM({
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        'qatar-gold': '#c99e53',
        'qatar-purple': '#680a4d'
      },
    },
  },
  corePlugins: {
    textOpacity: true,
    backgroundClip: true,
  },
  plugins: [],
})