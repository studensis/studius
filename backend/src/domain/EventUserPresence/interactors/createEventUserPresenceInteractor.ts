import { EventUserPresenceRepository } from '../repository/EventUserPresenceRepository';
import EventUserPresenceEntity from '../EventUserPresence';

export default async function createEventUserPresenceInteractor(
    eventUserPresenceRepository: EventUserPresenceRepository,
    eventUserPresence: EventUserPresenceEntity
) {
    let eventUserPresences = await eventUserPresenceRepository.create(eventUserPresence);
    return eventUserPresences;
}