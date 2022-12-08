/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'side': '32px 0px 32px -32px rgba(0, 93, 255, 0.25)',
      },
      colors:{
        
        dark: {
          accent: {
            DEFAULT: '#005DFF',
            strong: '#004ACC',
            medium: '#0A3889',
            weak: '#102343'
          },
          neutral: {
            DEFAULT: '#FFFFFF',
            strong: '#808080',
            medium: '#4D4D4D',
            weak: '#202020'
          },
          section: '#000000',
          background: '#141414',
          success: {
            DEFAULT: '#359A73',
            weak: 'rgba(53, 154, 115, 0.06)'
          },
          danger: {
            DEFAULT: '#DB5125',
            weak: 'rgba(219, 81, 37, 0.06)'
          },
          warning: {
            default: '#CB8A14',
            weak: 'rgba(203, 138, 20, 0.06)'
          },
        },
        light: {
          background: '#F5F6FA',
          accent: {
            DEFAULT: '#005DFF',
            strong: '#004ACC',
            medium: '#78A7FA',
            weak: '#C0D3F7'
          },
          neutral: {
            DEFAULT: '#000000',
            strong: '#7C7D80',
            medium: '#C0C1C4',
            weak: '#E4E5E9'
          },
          section: '#FFFFFF',
          background: '#F5F6FA',
          success: {
            DEFAULT: '#359A73',
            weak: 'rgba(53, 154, 115, 0.06)'
          },
          danger: {
            DEFAULT: '#DB5125',
            weak: 'rgba(219, 81, 37, 0.06)'
          },
          warning: {
            DEFAULT: '#CB8A14',
            weak: 'rgba(203, 138, 20, 0.06)'
          },
        },
        special: {
          black: '#000000',
          white: '#FFFFFF'
        }
        
      }
    },
    fontFamily: {
      'roobert': ['Roobert', 'sans-serif'],
      'inter': ['Inter', 'sans-serif']
    }
  },
  plugins: [],
  darkMode: 'class'
}
