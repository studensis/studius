import { EventRepository } from '../repository/EventRepository';
import { updateEventEntity } from '../updateEventEntity';

export default async function updateEventInteractor(
	eventRepository: EventRepository,
	event: updateEventEntity
) {
	let updatedEvent = await eventRepository.update(event);
	return updatedEvent;
}
