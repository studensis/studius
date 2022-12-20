'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useLogin from '../components/hooks/LoginContext';

export default function Home() {
	const { loggedIn } = useLogin();
	const router = useRouter();
	useEffect(() => {
		if (!loggedIn) {
			router.push('/login');
		} else {
			router.push('/intranet');
		}
	});

	return <div>Checking login status...</div>;
}
