import { EventRepository } from '../repository/EventRepository';
import EventEntity from '../EventEntity';

export default async function createEventInteractor(
	eventRepository: EventRepository,
	event: EventEntity
) {
	let events = await eventRepository.create(event);
	return events;
}
