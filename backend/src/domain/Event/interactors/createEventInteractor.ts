import { EventEntity } from '../model/EventEntity';
import { EventRepository } from '../repository/EventRepository';

export default async function createEventInteractor(
	eventRepository: EventRepository,
	event: EventEntity
) {
	let events = await eventRepository.create(event);
	return events;
}
