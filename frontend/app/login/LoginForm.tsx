'use client';

import { Button } from '../../components/@studius/Button/Button';
import useLogin from '../../components/hooks/LoginContext';

export default function LoginForm() {
	const { logIn } = useLogin();
	return (
		<>
			<form>
				<input type="text" placeholder="email" name="email"></input>
				<input
					type="password"
					placeholder="password"
					name="password"
				></input>
				Log in as:
				<Button
					onClick={() => {
						logIn();
					}}
				>
					Default User
				</Button>
				<Button
					onClick={() => {
						logIn();
					}}
				>
					Admin
				</Button>
			</form>
		</>
	);
}
