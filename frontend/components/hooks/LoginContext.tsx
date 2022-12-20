'use client';

import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

interface ILoginContext {
	loggedIn: boolean;
	loginRole: string;
	logIn: (role?: string) => void;
	logOut: () => void;
}

const LoginContext = createContext<ILoginContext | null>(null);

function LoginProvider({ children }: { children: React.ReactNode }) {
	const [loginState, setLoginState] = useState<boolean>(false);
	const [loginRole, setLoginRole] = useState<string>('default');
	const router = useRouter();

	useEffect(() => {
		let LS_loginState = JSON.parse(localStorage.getItem('loginState'));
		if (LS_loginState == true) {
			setLoginState(true);
		} else {
			setLoginState(false);
		}
	}, [loginState]);

	return (
		<>
			<LoginContext.Provider
				value={{
					loggedIn: loginState,
					loginRole: loginRole,
					logIn: (role?: string) => {
						localStorage.setItem(
							'loginState',
							JSON.stringify(true)
						);
						if (role) {
							setLoginRole(role);
						}
						setLoginState(true);
						router.push('/');
					},
					logOut: () => {
						localStorage.setItem(
							'loginState',
							JSON.stringify(false)
						);
						setLoginRole('default');
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
