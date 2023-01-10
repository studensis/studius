import { EventUserPresenceRepository } from '../repository/EventUserPresenceRepository';

export default async function getRoomTimeEventInteractor(
	eventUserPresenceRepository: EventUserPresenceRepository,
	id: string
) {
	let roomTimeEvents = await eventUserPresenceRepository.getRoomTimeEvent(id);
	return roomTimeEvents;
}
