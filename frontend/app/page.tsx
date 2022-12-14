'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../components/old/Button';

export default function Home() {
	const router = useRouter();

	const [loginStatus, setLoginStatus] = useState(-1);

	useEffect(() => {
		if (localStorage.getItem('session') === null) {
			localStorage.setItem('session', JSON.stringify({ status: false }));
			setLoginStatus(0);
		}

		let session = JSON.parse(localStorage.getItem('session'));

		if (session.status === false) {
			setLoginStatus(0);
		}
	}, []);
	useEffect(() => {
		if (loginStatus === 0) {
			console.log('Not logged in!');
			router.replace('/login');
		}
		if (loginStatus == 1) {
			console.log('Logged in!');
			localStorage.setItem('session', JSON.stringify({ status: true }));
		}
	}, [loginStatus]);

	return (
		<div>
			Hello there
			<Button
				onClick={() => {
					localStorage.setItem(
						'session',
						JSON.stringify({ status: false })
					);
					router.push('/login');
				}}
			>
				Log out
			</Button>
		</div>
	);
}
