import { PinnedEventRepository } from '../repository/PinnedEventRepository';

export default async function getPinnedEventInteractor(
	pinnedEventRepository: PinnedEventRepository,
	id: string
) {
	let pinnedEvents = await pinnedEventRepository.getById(id);
	return pinnedEvents;
}
