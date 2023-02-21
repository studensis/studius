import { FC, useState } from 'react';
import { Button } from '../../../../components/@studius/Button/Button';
import { Block } from '../../../../components/@studius/PageElements/Block';
import { Table } from '../../../../components/@studius/Table/Table';
import { trpc } from '../../../../components/hooks/TrpcProvider';

type formData = {
	timeStart: string;
	timeEnd: string;
	roomId: string;
};

const EventModal: FC<{ eventId: string }> = ({ eventId }) => {
	const roomTimeEvents = trpc.event.listAllSchedules.useQuery();
	const addRoomTimeEvent = trpc.event.schedule.useMutation();
	const rooms = trpc.room.listRooms.useQuery();

	const [formData, setFormData] = useState<formData>({
		timeStart: '',
		timeEnd: '',
		roomId: '',
	});

	function addNewRoomTimeEvent() {
		addRoomTimeEvent.mutate({
			dateEnd: formData.timeEnd,
			dateStart: formData.timeStart,
			roomId: formData.roomId,
			eventId: eventId,
			status: 'ACTIVE',
		});
	}

	return (
		<div className="p-10">
			<div className="flex justify-between m-2 my-4 mb-8">
				<div>
					<h1 className="title1">List of RoomTimeEvents</h1>
				</div>
				<div></div>
			</div>
			<div className="rounded-xl flex items-center justify-between">
				<div className="grid grid-cols-1">
					<label htmlFor="room">Room:</label>
					<select
						name="room"
						onChange={(e) => {
							setFormData({ ...formData, roomId: e.target.value });
						}}
						className="rounded-xl p-2 px-4 border-accent-medium border-2"
					>
						{rooms.data?.map((room) => {
							return (
								<>
									<option value={room.id}>{room.title}</option>
								</>
							);
						})}
					</select>
				</div>
				<div className="grid grid-cols-1">
					<label htmlFor="TimeStart">Start Time:</label>
					<input
						name="TimeStart"
						onChange={(e) => {
							setFormData({ ...formData, timeStart: e.target.value });
						}}
						className="rounded-xl p-2 px-4 border-accent-medium border-2"
						type="datetime-local"
					/>
				</div>
				<div className="grid grid-cols-1">
					<label htmlFor="TimeEnd">End Time:</label>
					<input
						name="TimeEnd"
						onChange={(e) => {
							setFormData({ ...formData, timeEnd: e.target.value });
						}}
						className="rounded-xl p-2 px-4 border-accent-medium border-2"
						type="datetime-local"
					/>
				</div>
				<Button
					onClick={() => {
						addNewRoomTimeEvent();
						roomTimeEvents.refetch();
					}}
				>
					<h1 className="title3">+</h1>
				</Button>
			</div>
			<Block>
				<Table
					titles={{
						dateStart: 'Starting Date',
						dateEnd: 'Ending Date',
						roomId: 'Room',
					}}
					objects={
						roomTimeEvents.data?.filter((event) => event.eventId == eventId) ||
						[]
					}
				></Table>
			</Block>
		</div>
	);
};

export default EventModal;
