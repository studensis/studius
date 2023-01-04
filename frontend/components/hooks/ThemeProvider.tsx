'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface IThemeContext {
	theme: 'dark' | 'light';
	setLight: () => void;
	setDark: () => void;
}

const ThemeContext = createContext<IThemeContext>({
	theme: 'light',
	setLight: () => {},
	setDark: () => {},
});

function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState<'light' | 'dark'>('light');

	useEffect(() => {
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) &&
				window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			setTheme('dark');
			document.body.classList.add('dark');
		} else {
			setTheme('light');
			document.body.classList.remove('dark');
		}
	}, []);

	useEffect(() => {
		localStorage.theme = theme;
	}, [theme]);

	return (
		<>
			<ThemeContext.Provider
				value={{
					theme: theme,
					setLight: () => {
						setTheme('light');
						localStorage.theme = 'light';
					},
					setDark: () => {
						setTheme('dark');
						localStorage.theme = 'dark';
					},
				}}
			>
				{children}
			</ThemeContext.Provider>
		</>
	);
}

const useTheme = () => useContext(ThemeContext);
export default useTheme;

export { ThemeProvider };
