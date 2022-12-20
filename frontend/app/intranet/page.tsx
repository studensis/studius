'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '../../components/@studius/Button/Button';
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
				<Link href="/user">
					<Button>Users</Button>
				</Link>
				<Link href="/subject">
					<Button>Subjects</Button>
				</Link>
				<h1>Test</h1>
			</div>
		</>
	);
}
