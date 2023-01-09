import { RoomTimeEventRepository } from '../repository/RoomTimeEventRepository';

export default async function listRoomTimeEventsInteractor(
	roomTimeEventRepository: RoomTimeEventRepository
) {
	let roomTimeEvents = await roomTimeEventRepository.getAll();
	return roomTimeEvents;
}
