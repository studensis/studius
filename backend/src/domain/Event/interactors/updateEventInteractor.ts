import { updateEventEntity } from '../model/updateEventEntity';
import { EventRepository } from '../repository/EventRepository';

export default async function updateEventInteractor(
	eventRepository: EventRepository,
	event: updateEventEntity
) {
	let updatedEvent = await eventRepository.update(event);
	return updatedEvent;
}
