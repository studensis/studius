import { EventUserPresenceRepository } from '../repository/EventUserPresenceRepository';
import EventUserPresenceEntity from '../EventUserPresence';

export default async function updateEventUserPresenceInteractor(
    eventUserPresenceRepository: EventUserPresenceRepository,
    eventUserPresence: EventUserPresenceEntity
) {
    let updatedEventUserPresence = await eventUserPresenceRepository.update(eventUserPresence);
    return updatedEventUserPresence;
}
