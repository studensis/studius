'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { trpc } from './TrpcProvider';

type User = {
	userId: string;
	role: string;
};

interface ILoginContext {
	loggedIn: boolean;
	user: User | null;
	login: (input: { email: string; password: string }) => any;
	logout: () => any;
	// login: typeof trpc.auth.login.useMutation
}

const LoginContext = createContext<ILoginContext>({
	loggedIn: false,
	user: null,
	login: (input: { email: string; password: string }) => null,
	logout: () => null,
});

function LoginProvider({ children }: { children: React.ReactNode }) {
	const [loginState, setLoginState] = useState<boolean>(false);
	const [user, setUser] = useState<User | null>(null);

	const me = trpc.auth.me.useQuery(undefined, { refetchInterval: 10000 });

	useEffect(() => {
		if (!me.data) {
			setLoginState(false);
			setUser(null);
		} else {
			setLoginState(true);
			setUser(me.data);
		}
	}, [me]);

	const login = trpc.auth.login.useMutation();
	const logout = trpc.auth.logout.useMutation();

	const refetch = () => {
		me.refetch();
	};

	return (
		<>
			<LoginContext.Provider
				value={{
					loggedIn: loginState,
					user: user,
					login: (input) => {
						login.mutate(input);
						setTimeout(() => {
							refetch();
						}, 200);
					},
					logout: () => {
						logout.mutate();
						setTimeout(() => {
							refetch();
						}, 200);
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
