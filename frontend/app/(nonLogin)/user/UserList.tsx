'use client';

import Link from 'next/link';
import { trpc } from '../../../components/hooks/TrpcProvider';

export default function SubjectList() {
	const users = trpc.user.listUsers.useQuery(undefined, {
		refetchInterval: 5000,
	});

	return (
		<div className="grid grid-cols-3 gap-4">
			{users.data &&
				users.data.map((user) => {
					return (
						<Link href={'/user/' + user.id} key={user.id}>
							<div className="p-6 border-light-accent-weak border">
								<p className="title1">{user.firstname}</p>
								<p>{user.id}</p>
							</div>
						</Link>
					);
				})}
		</div>
	);
}
