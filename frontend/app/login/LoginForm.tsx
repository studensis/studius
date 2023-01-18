'use client';

import { GoogleLogin } from '@react-oauth/google';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { Button } from '../../components/@studius/Button/Button';
import { PageStack, Stack } from '../../components/@studius/PageElements/Stack';
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

	const googleLogin = trpc.auth.external.google.login.useMutation();

	useEffect(() => {
		if (login.isSuccess || googleLogin.isSuccess) {
			router.push('/intranet');
			refetch();
		}
	}, [login, googleLogin]);

	return (
		<>
			<PageStack>
				<Stack cols={1}>
					{login.isError && (
						<pre className="bg-danger-weak p-10 mb-4 rounded-2xl">
							{login.error.shape?.message}
						</pre>
					)}
					{googleLogin.isError && (
						<pre className="bg-danger-weak p-10 mb-4 rounded-2xl">
							{googleLogin.error.shape?.message}
						</pre>
					)}
					<form
						onSubmit={(e) => {
							e.preventDefault();
							login.mutate(form);
						}}
						className="flex flex-col"
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
							className="w-full py-10"
							loading={login.isLoading}
						>
							Log in
						</Button>
					</form>
				</Stack>
				<p className="title2 text-neutral-strong">or log in with</p>
				<Stack cols={1}>
					<GoogleLogin
						onSuccess={(response) => {
							response.credential &&
								googleLogin.mutate({ credential: response.credential });
						}}
					/>
				</Stack>
				<p className="body1 text-neutral-strong">
					By logging in you agree to Studius'{' '}
					<Link href="/legal/terms-of-service">Terms of Service</Link> and{' '}
					<Link href="/legal/privacy-policy">Privacy Policy</Link>.
				</p>
			</PageStack>
		</>
	);
}
