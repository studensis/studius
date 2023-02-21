'use client';

import { useRouter } from 'next/navigation';
import useDialog from '../../../components/@studius/Modal/DialogProvider';
import { Block } from '../../../components/@studius/PageElements/Block';
import { Stack } from '../../../components/@studius/PageElements/Stack';
import { Spinner } from '../../../components/@studius/Spinner/Spinner';
import { Table } from '../../../components/@studius/Table/Table';
import { trpc } from '../../../components/hooks/TrpcProvider';

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
						<Table
							titles={{
								title: 'Room name',
								capacity: 'Room Capacity',
							}}
							objects={rooms.data || []}
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
