import EventUserPresenceEntity from '../model/EventUserPresenceEntity';
import { EventUserPresenceRepository } from '../repository/EventUserPresenceRepository';

export default async function createEventUserPresenceInteractor(
	eventUserPresenceRepository: EventUserPresenceRepository,
	eventUserPresence: EventUserPresenceEntity
) {
	let eventUserPresences = await eventUserPresenceRepository.create(
		eventUserPresence
	);
	return eventUserPresences;
}
