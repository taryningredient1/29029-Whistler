/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#EDE4D8',
        burgundy: '#A85878',
        charcoal: '#1E1610',
        warmGray: '#8C7B6E',
        cardBg: '#FFFCF8',
        border: '#DDD0BE',
        success: '#2F6B4F',
        warning: '#B07830',
        urgent: '#B3261E',
        inactive: '#C8B8A4',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
