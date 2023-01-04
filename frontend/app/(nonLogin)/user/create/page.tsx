'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../../../../components/@studius/Button/Button';
import { trpc } from '../../../../components/hooks/TrpcProvider';

export default function Calendar() {
	const createUser = trpc.user.createUser.useMutation();

	const [formData, setFormData] = useState<{
		id: undefined;
		password: string;
		firstname: string;
		lastname: string;
		jmbag: string;
		email: string;
		mentorID: string;
		userRole: 'DEFAULT';
	}>({
		id: undefined,
		password: '',
		firstname: '',
		lastname: '',
		jmbag: '',
		email: '',
		mentorID: '',
		userRole: 'DEFAULT',
	});

	const router = useRouter();

	useEffect(() => {
		if (createUser.status === 'success') {
			router.push('/user');
		}
		console.log(createUser.status);
	}, [createUser]);

	return (
		<>
			<div>
				<h1 className="display3">Create User</h1>

				<Button
					onClick={() => {
						console.log(formData);

						createUser.mutate({
							email: formData.email,
							firstname: formData.firstname,
							lastname: formData.lastname,
							password: formData.password,
							...(formData.jmbag
								? { jmbag: formData.jmbag }
								: {}),
							...(formData.mentorID
								? { mentorID: formData.mentorID }
								: {}),
						});
					}}
				>
					Create User
				</Button>

				{createUser.isSuccess && (
					<pre className="p-4 bg-neutral-weak">
						{JSON.stringify(createUser.data)}
					</pre>
				)}
				{createUser.error && (
					<pre className="p-4 bg-danger">
						{JSON.stringify(
							createUser.error.shape?.message,
							null,
							2
						)}
					</pre>
				)}
				<form className="flex flex-col gap-8">
					<input
						className="p-4"
						type={'text'}
						placeholder={'id'}
						disabled
						value={undefined}
					/>
					<input
						className="p-4"
						type={'text'}
						placeholder={'password'}
						onChange={(e) => {
							setFormData({
								...formData,
								password: e.currentTarget.value,
							});
						}}
					/>
					<input
						className="p-4"
						type={'text'}
						placeholder={'firstname'}
						onChange={(e) => {
							setFormData({
								...formData,
								firstname: e.currentTarget.value,
							});
						}}
					/>
					<input
						className="p-4"
						type={'text'}
						placeholder={'lastname'}
						onChange={(e) => {
							setFormData({
								...formData,
								lastname: e.currentTarget.value,
							});
						}}
					/>
					<input
						className="p-4"
						type={'text'}
						placeholder={'jmbag'}
						onChange={(e) => {
							setFormData({
								...formData,
								jmbag: e.currentTarget.value,
							});
						}}
					/>
					<input
						className="p-4"
						type={'text'}
						placeholder={'email'}
						onChange={(e) => {
							setFormData({
								...formData,
								email: e.currentTarget.value,
							});
						}}
					/>
					<input
						className="p-4"
						type={'text'}
						placeholder={'mentorID'}
						onChange={(e) => {
							setFormData({
								...formData,
								mentorID: e.currentTarget.value,
							});
						}}
					/>
					<input
						className="p-4"
						type={'text'}
						placeholder={'DEFAULT'}
						disabled
					/>
				</form>
			</div>
		</>
	);
}
