'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useLogin from '../../components/hooks/LoginContext';

export default function Home() {
	const { loggedIn } = useLogin();
	const router = useRouter();

	useEffect(() => {
		if (loggedIn) {
			router.push('/intranet');
		} else {
			router.push('/login');
		}
	}, [loggedIn]);
	return <div>Loading...</div>;
}
