import { EventUserPresenceRepository } from '../repository/EventUserPresenceRepository';

export default async function getAssociatedRoomTimeEventInteractor(
	eventUserPresenceRepository: EventUserPresenceRepository,
	id: string
) {
	let roomTimeEvents =
		await eventUserPresenceRepository.getAssociatedRoomTimeEvent(id);
	return roomTimeEvents;
}
