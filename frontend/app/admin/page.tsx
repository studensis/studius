'use client';

import Link from 'next/link';
import { Button } from '../../components/@studius/Button/Button';
import useLogin from '../../components/hooks/LoginContext';

export default function AdminTools() {
	const { loggedIn } = useLogin();

	return (
		<>
			{loggedIn ? (
				<div>
					<h1 className="display3"> Workspace Tools </h1>
					<Link href="/user">
						<Button>Users</Button>
					</Link>
					<Link href="/subject">
						<Button>Subjects</Button>
					</Link>
					<h1>Test</h1>
				</div>
			) : (
				<>You are not logged in!</>
			)}
		</>
	);
}
