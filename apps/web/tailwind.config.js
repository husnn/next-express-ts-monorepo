/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    colors: {
      primary: 'var(--color-purple)',
      secondary: 'var(--color-yellow)',
      grey: 'var(--color-grey)',
      'grey-light': 'var(--color-grey-light)'
    },
    extend: {
      backgroundImage: {
        wave: "url('/wave-line.svg')"
      }
    }
  },
  plugins: []
};
