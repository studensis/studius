'use client';

import { Button } from '../../components/@studius/Button/Button';

export default function LoginForm() {
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
						// logIn();
					}}
				>
					Default User
				</Button>
				<Button
					onClick={() => {
						// logIn('admin');
					}}
				>
					Admin
				</Button>
			</form>
		</>
	);
}
