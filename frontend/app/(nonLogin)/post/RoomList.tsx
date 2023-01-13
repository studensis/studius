'use client';

import { Button } from '../../../components/@studius/Button/Button';
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
						<Button
							onClick={() => {
								posts.refetch();
							}}
							loading={posts.isLoading}
						>
							Refetch
						</Button>
						<Table
							objects={posts.data || []}
							titles={{
								title: 'Title',
								ownerId: 'Owner ID',
							}}
							actionRow={(post) => {
								return (
									<>
										<div className="flex gap-2 flex-row-reverse">
											<Button
												small
												leftIcon="burgerMenu"
												onClick={() => {
													navigator.clipboard.writeText(post.id);
												}}
											></Button>
											<Button
												small
												leftIcon="delete"
												onClick={() => {
													deletePost.mutate(post.id);
												}}
											></Button>
											{/* <Button
												small
												leftIcon="edit"
												onClick={() => {
													setModal(
														<UpdatePostModal
															room={{
																id: post.id,
																capacity: post.capacity,
																title: post.title,
															}}
														/>
													);
												}}
											></Button> */}
										</div>
									</>
								);
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
