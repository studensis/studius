import EventUserPresenceEntity from '../model/EventUserPresenceEntity';
import { EventUserPresenceRepository } from '../repository/EventUserPresenceRepository';

export default async function updateEventUserPresenceInteractor(
	eventUserPresenceRepository: EventUserPresenceRepository,
	eventUserPresence: EventUserPresenceEntity
) {
	let updatedEventUserPresence = await eventUserPresenceRepository.update(
		eventUserPresence
	);
	return updatedEventUserPresence;
}
