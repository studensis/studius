import { updatePinnedEventEntity } from '../model/updatePinnedEventEntity';
import { PinnedEventRepository } from '../repository/PinnedEventRepository';

export default async function updatePinnedEventInteractor(
	pinnedEventRepository: PinnedEventRepository,
	pinnedEvent: updatePinnedEventEntity
) {
	let updatedPinnedEvent = await pinnedEventRepository.update(pinnedEvent);
	return updatedPinnedEvent;
}
