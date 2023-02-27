/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			boxShadow: {
				side: '32px 0px 32px -32px var(--color-shadow)',
				'lg-left': '-32px 0px 32px -32px var(--color-shadow)',
				'lg-top': '0px -32px 32px -32px var(--color-shadow)',
				'lg-right': '32px 0px 32px -32px var(--color-shadow)',
				'lg-top': '0px -32px 32px -32px var(--color-shadow)',
				'sm-top': '0px -16px 16px -16px var(--color-shadow)',
				'sm-bottom': '0px 16px 16px -16px var(--color-shadow)',
			},
			colors: {
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
					weak: 'var(--color-success-weak)',
				},
				danger: {
					DEFAULT: 'var(--color-danger)',
					strong: 'var(--color-danger-strong)',
					medium: 'var(--color-danger-medium)',
					weak: 'var(--color-danger-weak)',
				},
				warning: {
					DEFAULT: 'var(--color-warning)',
					weak: 'var(--color-warning-weak)',
				},
				info: {
					DEFAULT: 'var(--color-info)',
					weak: 'var(--color-info-weak)',
				},
				special: {
					black: 'var(--color-special-black)',
					white: 'var(--color-special-white)',
				},
			},
		},
		fontFamily: {
			roobert: ['Roobert', 'sans-serif'],
			inter: ['Inter', 'sans-serif'],
		},
	},
	plugins: [],
	darkMode: 'class',
};
