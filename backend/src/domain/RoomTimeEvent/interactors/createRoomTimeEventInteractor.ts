import { RoomTimeEventEntity } from '../model/RoomTimeEventEntity';
import { RoomTimeEventRepository } from '../repository/RoomTimeEventRepository';

export default async function createRoomTimeEventInteractor(
	roomTimeEventRepository: RoomTimeEventRepository,
	roomTimeEvent: RoomTimeEventEntity
) {
	let roomTimeEvents = await roomTimeEventRepository.create(roomTimeEvent);
	return roomTimeEvents;
}
