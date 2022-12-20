'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useLogin from '../../components/hooks/LoginContext';

export default function Intranet() {
	const { loggedIn } = useLogin();
	const router = useRouter();
	useEffect(() => {
		if (!loggedIn) {
			router.push('/login');
		}
	}, []);

	// let a = await testBackend();

	return (
		<>
			<div>
				<Link href="/user">Users</Link>
				<Link href="/subject">Subjects</Link>
			</div>
		</>
	);
}
