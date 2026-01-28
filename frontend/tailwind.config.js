/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {
      keyframes: {
        pageFadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)', filter: 'blur(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)', filter: 'blur(0)' },
        }
      },
      animation: {
        'page-fade': 'pageFadeIn 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards',
      }
    },
  },
  plugins: [],
}
