'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../../../components/@studius/Button/Button';
import useDialog from '../../../components/@studius/Modal/DialogProvider';
import { Block } from '../../../components/@studius/PageElements/Block';
import { Stack } from '../../../components/@studius/PageElements/Stack';
import { Spinner } from '../../../components/@studius/Spinner/Spinner';
import { Table } from '../../../components/@studius/Table/Table';
import { trpc } from '../../../components/hooks/TrpcProvider';
import { UpdateRoomModal } from './UpdateRoomModal';

export default function SubjectList() {
	const rooms = trpc.room.listRooms.useQuery();
	const deleteRoom = trpc.room.deleteRoomById.useMutation();

	// useEffect(() => {
	// 	if (updateUser.isSuccess) {
	// 		rooms.refetch();
	// 	}
	// }, [updateUser]);
	const router = useRouter();

	// useEffect(() => {
	// 	if (deleteRoom.isSuccess) {
	// 		router.refresh();
	// 	}
	// }, [deleteRoom]);

	const { setModal } = useDialog();

	return (
		<>
			{rooms.isLoading && <Spinner />}
			{rooms.data && (
				<Stack cols={1}>
					<Stack cols={3} mobileCols={1}>
						<Block>
							<p className="caption text-neutral-strong">Number of Rooms</p>
							<p className="title2 text-neutral">{rooms.data.length}</p>
						</Block>
					</Stack>
					<Block>
						<Button
							onClick={() => {
								rooms.refetch();
							}}
							loading={rooms.isLoading}
						>
							Refetch
						</Button>
						<Table
							titles={{
								title: 'Room name',
								capacity: 'Room Capacity',
							}}
							objects={rooms.data || []}
							actionRow={(room) => {
								return (
									<>
										<div className="flex gap-2 flex-row-reverse">
											<Button
												small
												leftIcon="burgerMenu"
												onClick={() => {
													navigator.clipboard.writeText(room.id);
												}}
											></Button>
											<Button
												small
												leftIcon="delete"
												onClick={() => {
													deleteRoom.mutate(room.id);
												}}
											></Button>
											<Button
												small
												leftIcon="edit"
												onClick={() => {
													setModal(
														<UpdateRoomModal
															room={{
																id: room.id,
																capacity: room.capacity,
																title: room.title,
															}}
														/>
													);
												}}
											></Button>
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
