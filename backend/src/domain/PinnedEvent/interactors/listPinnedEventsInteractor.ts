import { paginationType } from '../../pagination/paginationObj';
import { PinnedEventRepository } from '../repository/PinnedEventRepository';

export default async function listPinnedEventsInteractor(
	pinnedEventRepository: PinnedEventRepository,
	paginationInfo: paginationType
) {
	let pinnedEvents = await pinnedEventRepository.getAll(paginationInfo);
	return pinnedEvents;
}
