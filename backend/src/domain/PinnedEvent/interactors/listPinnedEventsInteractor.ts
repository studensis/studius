import { PinnedEventRepository } from '../repository/PinnedEventRepository';

export default async function listPinnedEventsInteractor(
	pinnedEventRepository: PinnedEventRepository
) {
	let pinnedEvents = await pinnedEventRepository.getAll();
	return pinnedEvents;
}
