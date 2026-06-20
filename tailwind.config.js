/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#F7F7F5',
        card: '#FFFFFF',
        border: '#E5E5E5',
        'border-hover': '#D1D1D1',
        primary: '#1A1A1A',
        secondary: '#6B6B6B',
        success: '#2EA043',
        warning: '#D29922',
        danger: '#F85149',
        sidebar: '#F7F7F5'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      spacing: {
        sidebar: '240px',
        topbar: '64px'
      },
      borderRadius: {
        card: '12px'
      },
      boxShadow: {
        card: '0 4px 12px rgba(0,0,0,0.03)'
      }
    }
  },
  plugins: []
}
