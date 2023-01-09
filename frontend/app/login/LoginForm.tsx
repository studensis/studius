'use client';

import { useRouter } from 'next/navigation';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { Button } from '../../components/@studius/Button/Button';
import useLogin from '../../components/hooks/LoginContext';
import { trpc } from '../../components/hooks/TrpcProvider';

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
				'px-4 py-6 border border-neutral-weak rounded-xl w-full mb-4 !text-neutral bg-neutral-weak'
			}
		></input>
	);
};

export default function LoginForm() {
	const { refetch, user, loggedIn } = useLogin();

	const [form, setForm] = useState({
		email: '',
		password: '',
	});

	const router = useRouter();

	const login = trpc.auth.login.useMutation();

	// useEffect(() => {
	// 	if (loggedIn && user) {
	// 		router.push('/intranet');
	// 	}
	// }, [loggedIn]);

	useEffect(() => {
		if (login.isSuccess) {
			router.push('/intranet');
			refetch();
		}
	}, [login]);

	return (
		<>
			{login.isError && (
				<pre className="bg-danger-weak p-10 mb-4 rounded-2xl">
					{login.error.shape?.message}
				</pre>
			)}
			<form
				onSubmit={(e) => {
					e.preventDefault();
					login.mutate(form);
				}}
			>
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
					formType={'submit'}
					onClick={() => {
						login.mutate(form);
					}}
				>
					Log in
				</Button>
			</form>
			{login.isLoading && <>Loading...</>}
		</>
	);
}
