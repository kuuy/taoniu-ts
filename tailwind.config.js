const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#29ccc4',
        primaryDark: '#2fbab3',
        green: colors.emerald,
        yellow: colors.amber,
        purple: colors.violet,
      },
      spacing: {
        '110': '26rem',
        '128': '32rem',
        '144': '36rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
  corePlugins: {
    container: false,
  }
}

