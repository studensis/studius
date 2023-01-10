import { RoomTimeEventRepository } from '../repository/RoomTimeEventRepository';

export default async function listEventUserPresencesInteractor(
	roomTimeEventRepository: RoomTimeEventRepository,
	id: string
) {
	let roomTimeEvents = await roomTimeEventRepository.listEventUserPresences(id);
	return roomTimeEvents;
}
