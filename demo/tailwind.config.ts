const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  important: true,
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    fontFamily: {
      serif: ['Lora', ...defaultTheme.fontFamily.serif],
    },
    extend: {
      colors: {
        'spring-wood': {
          50: '#f9f7f4',
          100: '#f5f1eb',
          200: '#ede6db',
          300: '#dfd3c2',
          400: '#ccb99d',
          500: '#b79f7c',
          600: '#a08762',
          700: '#857050',
          800: '#705e44',
          900: '#5f513d',
          950: '#322a1d',
        },
        'cape-cod': {
          50: '#f6f7f7',
          100: '#e3e4e4',
          200: '#c6c9c7',
          300: '#a2a6a3',
          400: '#7e8380',
          500: '#646866',
          600: '#4f5251',
          700: '#414443',
          800: '#363837',
          900: '#303131',
          950: '#191a1a',
        },
      },
    },
  },
};
