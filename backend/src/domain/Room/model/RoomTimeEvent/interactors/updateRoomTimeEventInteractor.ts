import RoomTimeEventEntity from '../model/RoomTimeEventEntity';
import { RoomTimeEventRepository } from '../repository/RoomTimeEventRepository';

export default async function updateRoomTimeEventInteractor(
	roomTimeEventRepository: RoomTimeEventRepository,
	roomTimeEvent: RoomTimeEventEntity
) {
	let updatedRoomTimeEvent = await roomTimeEventRepository.update(
		roomTimeEvent
	);
	return updatedRoomTimeEvent;
}
