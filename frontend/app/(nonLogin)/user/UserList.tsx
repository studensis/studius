'use client';

import Link from 'next/link';
import { Block } from '../../../components/@studius/PageElements/Block';
import { Stack } from '../../../components/@studius/PageElements/Stack';
import { Spinner } from '../../../components/@studius/Spinner/Spinner';
import { trpc } from '../../../components/hooks/TrpcProvider';

export default function SubjectList() {
	const users = trpc.user.listUsers.useQuery(undefined, {
		refetchInterval: 5000,
	});

	return (
		<Stack cols={2} mobileCols={1}>
			{users.isLoading && <Spinner />}
			{users.data &&
				users.data.map((user) => {
					return (
						<Link href={'/user/' + user.id} key={user.id}>
							<Block>
								<p className="title1">{user.firstname + ' ' + user.lastname}</p>
								<p className="text-neutral-strong caption">{user.id}</p>
							</Block>
						</Link>
					);
				})}
		</Stack>
	);
}
