'use client';

import Link from 'next/link';
import { Button } from '../../../components/@studius/Button/Button';
import { trpc } from '../../../components/hooks/TrpcProvider';

export default function AdminToolbar() {
	const me = trpc.auth.me.useQuery();

	return (
		<>
			{me.data && (me.data.role == 'ADMIN' || me.data.role == 'SUPERADMIN') ? (
				<Link href="/subject/create">
					<Button rightIcon="add">Create subject</Button>
				</Link>
			) : (
				<> </>
			)}
		</>
	);
}
