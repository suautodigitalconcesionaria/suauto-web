/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-red': '#DC2626',
        'brand-red-dark': '#B91C1C',
        'brand-silver': '#9CA3AF',
        card: '#111111',
        'card-hover': '#1A1A1A',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #DC2626, 0 0 10px #DC2626' },
          '100%': { boxShadow: '0 0 20px #DC2626, 0 0 40px #DC2626' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        glow: 'glow 2s ease-in-out infinite alternate',
        float: 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
