import { EventRepository } from '../repository/EventRepository';

export default async function deleteEventInteractor(
    id: string, 
    eventRepository: EventRepository
) {
    let response = await eventRepository.delete(id);
    return response;
}