'use client';

import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

interface ILoginContext {
	loggedIn: boolean;
	logIn: () => void;
	logOut: () => void;
}

const LoginContext = createContext<ILoginContext | null>(null);

function LoginProvider({ children }: { children: React.ReactNode }) {
	const [loginState, setLoginState] = useState<boolean>(false);
	const router = useRouter();

	useEffect(() => {
		let LS_loginState = JSON.parse(localStorage.getItem('loginState'));
		if (LS_loginState == true) {
			setLoginState(true);
		} else {
			setLoginState(false);
			localStorage.setItem('loginState', JSON.stringify(false));
		}
	});

	return (
		<>
			<LoginContext.Provider
				value={{
					loggedIn: loginState,
					logIn: () => {
						localStorage.setItem(
							'loginState',
							JSON.stringify(true)
						);
						setLoginState(true);
						router.push('/');
					},
					logOut: () => {
						localStorage.setItem(
							'loginState',
							JSON.stringify(false)
						);
						setLoginState(false);
						router.push('/login');
					},
				}}
			>
				{children}
			</LoginContext.Provider>
		</>
	);
}

const useLogin = () => useContext(LoginContext);
export default useLogin;

export { LoginProvider };
