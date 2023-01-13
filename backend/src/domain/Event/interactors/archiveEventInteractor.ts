import { EventRepository } from '../repository/EventRepository';

export default async function archiveEventInteractor(
	id: string,
	eventRepository: EventRepository
) {
	let response = await eventRepository.archive(id);
	return response;
}
