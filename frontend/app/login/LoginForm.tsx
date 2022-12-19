'use client';

import useLogin from '../../components/hooks/LoginContext';
import { Button } from '../../components/old/Button';

export default function LoginForm() {
	const { logIn } = useLogin();
	return (
		<>
			<Button
				onClick={() => {
					logIn();
				}}
			>
				Log in
			</Button>
		</>
	);
}
