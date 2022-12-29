import { EventUserPresenceRepository } from '../repository/EventUserPresenceRepository';
import EventUserPresenceEntity from '../EventUserPresenceEntity';

export default async function updateEventUserPresenceInteractor(
    eventUserPresenceRepository: EventUserPresenceRepository,
    eventUserPresence: EventUserPresenceEntity
) {
    let updatedEventUserPresence = await eventUserPresenceRepository.update(eventUserPresence);
    return updatedEventUserPresence;
}
