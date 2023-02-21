'use client';

import {
	PageStack,
	Stack,
} from '../../../components/@studius/PageElements/Stack';
import PageHeader from '../../../components/@studius/PageHeader/PageHeader';
import Protected from '../../../components/@studius/Protected/Protected';
import PostCard from '../../../components/Cards/PostCard';
import { trpc } from '../../../components/hooks/TrpcProvider';
// import AdminToolbar from './AdminToolbar';

export default function Page() {
	const posts = trpc.post.listPosts.useQuery().data;

	return (
		<>
			<Protected minRole={'DEFAULT'} displayMessage>
				<PageStack>
					<PageHeader title={'All Posts'} />
					<Stack cols={3}>
						{posts?.map((post) => {
							return (
								<PostCard
									title={post.title}
									id={post.id}
									key={post.id}
								></PostCard>
							);
						})}
					</Stack>
				</PageStack>
			</Protected>
		</>
	);
}
