'use client';

import Link from 'next/link';
import { Button } from '../../components/@studius/Button/Button';
import useLogin from '../../components/hooks/LoginContext';

export default function AdminToolbar() {
	const { loginRole } = useLogin();
	return (
		<>
			{loginRole == 'admin' ? (
				<Link href="/user/create">
					<Button rightIcon="user">Create user</Button>
				</Link>
			) : (
				<> </>
			)}
		</>
	);
}
