import { EventRepository } from '../repository/EventRepository';

export default async function listAssociatedRoomTimeEventsInteractor(
	eventRepository: EventRepository,
	id: string
) {
	let roomTimeEvents = await eventRepository.listAssociatedRoomTimeEvents(id);
	return roomTimeEvents;
}
