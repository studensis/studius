import { paginationType } from '../../pagination/paginationObj';
import { EventRepository } from '../repository/EventRepository';

export default async function listEventsInteractor(
	eventRepository: EventRepository,
	paginationInfo: paginationType
) {
	let events = await eventRepository.listPaginated(paginationInfo);
	return events;
}
