import { EventRepository } from '../repository/EventRepository';

export default async function listAssociatedSchedulesInteractor(
	eventRepository: EventRepository,
	eventId: string
) {
	let schedules = await eventRepository.listAssociatedSchedules(eventId);
	return schedules;
}
