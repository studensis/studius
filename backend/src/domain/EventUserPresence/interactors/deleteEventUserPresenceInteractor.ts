import { EventUserPresenceRepository } from '../repository/EventUserPresenceRepository';

export default async function deleteEventUserPresenceInteractor(
    id: string, 
    eventUserPresenceRepository: EventUserPresenceRepository
) {
    let response = await eventUserPresenceRepository.delete(id);
    return response;
}