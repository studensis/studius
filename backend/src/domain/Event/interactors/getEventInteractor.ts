import { EventRepository } from '../repository/EventRepository';

export default async function getEventInteractor(
	eventRepository: EventRepository,
	id: number
) {
	let event = await eventRepository.getById(id);
	return event;
}
