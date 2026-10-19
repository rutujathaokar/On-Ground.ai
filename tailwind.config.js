/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        og: {
          dark: '#08201A',
          sidebar: '#0A2820',
          sidebarHover: '#0E352B',
          sidebarActive: '#12483B',
          accent: '#10B981',
          navy: '#1B233D',
          navyCard: '#242D4D',
          navyHover: '#2A3459',
          border: '#E2E8F0',
          bg: '#F5F7FA',
          purple: '#6B21A8',
          purpleLight: '#F3E8FF',
          amber: '#D97706',
          amberLight: '#FEF3C7'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
