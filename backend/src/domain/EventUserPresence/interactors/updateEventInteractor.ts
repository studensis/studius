import { EventRepository } from '../repository/EventRepository';
import EventEntity from '../EventEntity';

export default async function updateEventInteractor(
    eventRepository: EventRepository,
    event: EventEntity
) {
    let updatedEvent = await eventRepository.update(event);
    return updatedEvent;
}
