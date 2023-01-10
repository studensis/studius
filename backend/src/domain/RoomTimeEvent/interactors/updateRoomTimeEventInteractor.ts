import { updateRoomTimeEventEntity } from '../model/updateRoomTimeEventEntity';
import { RoomTimeEventRepository } from '../repository/RoomTimeEventRepository';

export default async function updateRoomTimeEventInteractor(
	roomTimeEventRepository: RoomTimeEventRepository,
	roomTimeEvent: updateRoomTimeEventEntity
) {
	let updatedRoomTimeEvent = await roomTimeEventRepository.update(
		roomTimeEvent
	);
	return updatedRoomTimeEvent;
}
