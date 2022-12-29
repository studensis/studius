import { EventUserPresenceRepository } from '../repository/EventUserPresenceRepository';
import EventUserPresenceEntity from '../EventUserPresenceEntity';

export default async function createEventUserPresenceInteractor(
    eventUserPresenceRepository: EventUserPresenceRepository,
    eventUserPresence: EventUserPresenceEntity
) {
    let eventUserPresences = await eventUserPresenceRepository.create(eventUserPresence);
    return eventUserPresences;
}