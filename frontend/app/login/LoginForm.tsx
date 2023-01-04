'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../../components/@studius/Button/Button';
import useLogin from '../../components/hooks/LoginContext';

export default function LoginForm() {
	const { login, user, loggedIn } = useLogin();

	const [form, setForm] = useState({
		email: '',
		password: '',
	});

	const router = useRouter();

	useEffect(() => {
		if (loggedIn && user) {
			router.push('/intranet');
		}
	}, [loggedIn]);

	return (
		<>
			<form>
				<input
					type="text"
					placeholder="email"
					name="email"
					onChange={(e) => {
						setForm({ ...form, email: e.target.value });
					}}
				></input>
				<input
					type="password"
					placeholder="password"
					name="password"
					onChange={(e) => {
						setForm({ ...form, password: e.target.value });
					}}
				></input>
				Log in as:
				<Button
					onClick={() => {
						login(form);
					}}
				>
					Log in
				</Button>
			</form>
		</>
	);
}
