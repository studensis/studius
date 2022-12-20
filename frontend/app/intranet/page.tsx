'use client';

import useLogin from '../../components/hooks/LoginContext';

export default function Intranet() {
	const { loggedIn } = useLogin();

	return (
		<>
			{loggedIn ? (
				<div>
					<h1 className="display3">Welcome back!</h1>
				</div>
			) : (
				<>You are not logged in!</>
			)}
		</>
	);
}
