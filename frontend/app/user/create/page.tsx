'use client';

import { useState } from 'react';
import { Button } from '../../../components/@studius/Button/Button';
import useLogin from '../../../components/hooks/LoginContext';

export default function Calendar() {
	const { loggedIn } = useLogin();

	const [formData, setFormData] = useState<{
		id: undefined;
		password: string;
		firstname: string;
		lastname: string;
		jmbag: string;
		email: string;
		userRole: 'DEFAULT';
	}>({
		id: undefined,
		password: '',
		firstname: '',
		lastname: '',
		jmbag: '',
		email: '',
		userRole: 'DEFAULT',
	});

	return (
		<>
			{loggedIn ? (
				<div>
					<h1 className="display3">Create User</h1>
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
							disabled
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
							placeholder={'DEFAULT'}
							disabled
						/>
						<Button
							onClick={() => {
								console.log(formData);

								// let data = fetch(
								// 	'https://studius-backend-production.up.railway.app/users',
								// 	{ method: 'POST' }
								// );
								// data.then((response) => {
								// 	response.json().then((a) => {
								// 		console.log(formData);
								// 	});
								// });
							}}
						>
							Create User
						</Button>
					</form>
				</div>
			) : (
				<>You are not logged in!</>
			)}
		</>
	);
}
