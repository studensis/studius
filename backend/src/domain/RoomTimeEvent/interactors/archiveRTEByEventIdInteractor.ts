import { RoomTimeEventRepository } from '../repository/RoomTimeEventRepository';

export default async function archiveRTEByEventIdInteractor(
	eventId: string,
	roomTimeEventRepository: RoomTimeEventRepository
) {
	let response = await roomTimeEventRepository.archiveByEventId(eventId);
	return response;
}
