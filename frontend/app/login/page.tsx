'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoginForm from '../../components/login/LoginForm';

export default function Login() {
	const router = useRouter();

	const [loginStatus, setLoginStatus] = useState(-1);

	useEffect(() => {
		if (localStorage.getItem('session') === null) {
			localStorage.setItem('session', JSON.stringify({ status: false }));
			setLoginStatus(0);
		}

		let session = JSON.parse(localStorage.getItem('session'));

		if (session.status === true) {
			setLoginStatus(1);
		}
	}, []);

	useEffect(() => {
		if (loginStatus === 0) {
			console.log('Not logged in!');
		}
		if (loginStatus == 1) {
			console.log('Logged in!');
			router.replace('/');
		}
	}, [loginStatus]);

	return (
		<div>
			<h1> login page </h1>
			Login form
			<LoginForm setLoginStatus={setLoginStatus} />
		</div>
	);
}
