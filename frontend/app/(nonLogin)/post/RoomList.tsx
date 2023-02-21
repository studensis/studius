'use client';

import useDialog from '../../../components/@studius/Modal/DialogProvider';
import { Block } from '../../../components/@studius/PageElements/Block';
import { Stack } from '../../../components/@studius/PageElements/Stack';
import { Spinner } from '../../../components/@studius/Spinner/Spinner';
import { Table } from '../../../components/@studius/Table/Table';
import { trpc } from '../../../components/hooks/TrpcProvider';

export default function SubjectList() {
	const posts = trpc.post.listPosts.useQuery();
	const deletePost = trpc.post.deletePostById.useMutation();

	// useEffect(() => {
	// 	if (updateUser.isSuccess) {
	// 		rooms.refetch();
	// 	}
	// }, [updateUser]);

	// useEffect(() => {
	// 	if (deleteRoom.isSuccess) {
	// 		router.refresh();
	// 	}
	// }, [deleteRoom]);

	const { setModal } = useDialog();

	return (
		<>
			{posts.isLoading && <Spinner />}
			{posts.data && (
				<Stack cols={1}>
					<Stack cols={3} mobileCols={1}>
						<Block>
							<p className="caption text-neutral-strong">Number of Posts</p>
							<p className="title2 text-neutral">{posts.data.length}</p>
						</Block>
					</Stack>
					<Block>
						<Table
							objects={posts.data || []}
							titles={{
								title: 'Title',
							}}
							onClick={(user) => {
								console.log(user);
							}}
						/>
					</Block>
				</Stack>
			)}
		</>
	);
}
