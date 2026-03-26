import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'cs-black': {
          DEFAULT: '#0A0A0A',
          surface: '#141414',
          subtle: '#1A1A1A',
        },
        'cs-gold': {
          DEFAULT: '#C9A435',
          hover: '#E2C06A',
          muted: '#8B6F1E',
          dim: '#3D2F0A',
        },
        'cs-white': {
          DEFAULT: '#F5F0E8',
          muted: '#A89F8C',
          dim: '#6B6459',
        },
        'cs-border': {
          DEFAULT: '#2A2A2A',
          subtle: '#1E1E1E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A435 0%, #E2C06A 50%, #8B6F1E 100%)',
        'dark-gradient': 'linear-gradient(135deg, #141414 0%, #0A0A0A 100%)',
      },
      boxShadow: {
        'gold': '0 0 20px rgba(201, 164, 53, 0.15)',
        'gold-lg': '0 0 40px rgba(201, 164, 53, 0.25)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
