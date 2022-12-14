'use client';

import { Button } from '../old/Button';

export default function LoginForm(props: {
	setLoginStatus: (s: number) => void;
}) {
	return (
		<>
			<div>
				<form>
					<input placeholder="mail" />
					<input placeholder="password" />
					<Button
						onClick={() => {
							localStorage.setItem(
								'session',
								JSON.stringify({ status: true })
							);
							props.setLoginStatus(1);
						}}
					>
						Log in
					</Button>
				</form>
			</div>
		</>
	);
}
