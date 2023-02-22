import { EventRepository } from '../repository/EventRepository';

export default async function listEventsInteractor(
	eventRepository: EventRepository
) {
	let events = await eventRepository.getAll();
	return events;
}
