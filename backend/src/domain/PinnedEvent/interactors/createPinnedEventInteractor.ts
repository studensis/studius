import { PinnedEventEntity } from '../model/PinnedEventEntity';
import { PinnedEventRepository } from '../repository/PinnedEventRepository';

export default async function createPinnedEventInteractor(
	pinnedEventRepository: PinnedEventRepository,
	pinnedEvent: PinnedEventEntity
) {
	let pinnedEvents = await pinnedEventRepository.create(pinnedEvent);
	return pinnedEvents;
}
