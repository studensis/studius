/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'side': '32px 0px 32px -32px rgba(0, 93, 255, 0.25)',
      },
      colors:{
				accent: {
					DEFAULT: 'var(--color-accent)',
					strong: 'var(--color-accent-strong)',
					medium: 'var(--color-accent-medium)',
					weak: 'var(--color-accent-weak)',
				},
				neutral: {
					DEFAULT: 'var(--color-neutral)',
					strong: 'var(--color-neutral-strong)',
					medium: 'var(--color-neutral-medium)',
					weak: 'var(--color-neutral-weak)',
				},
				section: 'var(--color-section)',
				background: 'var(--color-background)',
				success: {
					DEFAULT: 'var(--color-success)',
					weak: 'var(--color-success-weak)'
				},
				danger: {
					DEFAULT: 'var(--color-danger)',
					weak: 'var(--color-danger-weak)'
				},
				warning: {
					default: 'var(--color-warning)',
					weak: 'var(--color-warning-weak)'
				},
        special: {
          black: 'var(--color-special-black)',
          white: 'var(--color-special-white)'
        }
      }
    },
    fontFamily: {
      'roobert': ['Roobert', 'sans-serif'],
      'inter': ['Inter', 'sans-serif']
    }
  },
  plugins: [],
  darkMode: 'class',
}
