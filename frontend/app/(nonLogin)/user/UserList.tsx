'use client';

import { Stack } from '../../../components/@studius/PageElements/Stack';
import { Spinner } from '../../../components/@studius/Spinner/Spinner';
import UserCard from '../../../components/Cards/UserCard';
import { trpc } from '../../../components/hooks/TrpcProvider';

export default function SubjectList() {
	const users = trpc.user.listUsers.useQuery(undefined, {
		refetchInterval: 5000,
	});

	return (
		<Stack cols={2} mobileCols={1}>
			{users.isLoading && <Spinner />}
			{users.data && users.data.map((user) => <UserCard user={user} />)}
		</Stack>
	);
}
