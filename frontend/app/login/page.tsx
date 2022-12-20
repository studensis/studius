'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useLogin from '../../components/hooks/LoginContext';
import LoginForm from './LoginForm';

export default function Login() {
	const { loggedIn } = useLogin();
	const router = useRouter();
	useEffect(() => {
		if (loggedIn) {
			router.push('/intranet');
		}
	}, [loggedIn]);
	return (
		<div>
			<h1 className="display3"> login page </h1>
			<p>You are logged out. Please log in.</p>
			<LoginForm />
		</div>
	);
}
