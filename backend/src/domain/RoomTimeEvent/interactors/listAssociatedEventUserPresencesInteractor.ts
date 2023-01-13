import { RoomTimeEventRepository } from '../repository/RoomTimeEventRepository';

export default async function listAssociatedEventUserPresencesInteractor(
	roomTimeEventRepository: RoomTimeEventRepository,
	id: string
) {
	let roomTimeEvents =
		await roomTimeEventRepository.listAssociatedEventUserPresences(id);
	return roomTimeEvents;
}
