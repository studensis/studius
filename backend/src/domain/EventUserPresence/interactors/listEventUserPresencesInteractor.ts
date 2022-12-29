import { EventUserPresenceRepository } from '../repository/EventUserPresenceRepository';

export default async function listEventUserPresencesInteractor(
    eventUserPresenceRepository: EventUserPresenceRepository
) {
    let eventUserPresences = await eventUserPresenceRepository.getAll();
    return eventUserPresences
}