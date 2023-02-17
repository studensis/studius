import { EventRepository } from '../repository/EventRepository';

export default async function listAssociatedSchedulesInteractor(
	eventRepository: EventRepository,
	id: string
) {
	let schedules = await eventRepository.listAssociatedSchedules(id);
	return schedules;
}
