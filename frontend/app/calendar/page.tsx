'use client';

import useLogin from '../../components/hooks/LoginContext';

export default function Calendar() {
	const { loggedIn } = useLogin();

	return (
		<>
			{loggedIn ? (
				<div>
					<h1 className="display3">Calendar</h1>
				</div>
			) : (
				<>You are not logged in!</>
			)}
		</>
	);
}
