'use client';

import { useRouter } from 'next/navigation';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { Button } from '../../components/@studius/Button/Button';
import useLogin from '../../components/hooks/LoginContext';

const TextInput = ({
	onChange,
	placeholder,
	name,
	type,
}: {
	onChange?: ChangeEventHandler<HTMLInputElement>;
	placeholder: string;
	name: string;
	type?: 'text' | 'password';
}) => {
	return (
		<input
			type={type || 'text'}
			onChange={onChange}
			placeholder={placeholder}
			name={name}
			className={
				'px-4 py-6 border border-neutral-weak rounded-xl w-full mb-4'
			}
		></input>
	);
};

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
				<TextInput
					type="text"
					placeholder="email"
					name="email"
					onChange={(e) => {
						setForm({ ...form, email: e.target.value });
					}}
				></TextInput>
				<TextInput
					type="password"
					placeholder="password"
					name="password"
					onChange={(e) => {
						setForm({ ...form, password: e.target.value });
					}}
				></TextInput>
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
