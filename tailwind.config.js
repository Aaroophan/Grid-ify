/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      extend: {
        fontSize: {
          '2xsm': ['0.125rem', { lineHeight: '0.175rem' }],
        }
      }
    },
  },
  plugins: [],
};
