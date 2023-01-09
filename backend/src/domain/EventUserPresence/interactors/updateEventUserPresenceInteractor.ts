import { updateEventUserPresenceEntity } from '../model/updateEventUserPresenceEntity';
import { EventUserPresenceRepository } from '../repository/EventUserPresenceRepository';

export default async function updateEventUserPresenceInteractor(
	eventUserPresenceRepository: EventUserPresenceRepository,
	eventUserPresence: updateEventUserPresenceEntity
) {
	let updatedEventUserPresence = await eventUserPresenceRepository.update(
		eventUserPresence
	);
	return updatedEventUserPresence;
}
