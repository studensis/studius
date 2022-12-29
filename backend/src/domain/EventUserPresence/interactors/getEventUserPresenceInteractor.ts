import { EventUserPresenceRepository } from '../repository/EventUserPresenceRepository';

export default async function getEventUserPresenceInteractor(
    eventUserPresenceRepository: EventUserPresenceRepository,
    id: string
) {
    let eventUserPresences = await eventUserPresenceRepository.getById(id);
    return eventUserPresences
}
