import { paginationType } from '../../pagination/paginationObj';
import { PinnedEventRepository } from '../repository/PinnedEventRepository';

export default async function listPaginatedPinnedEventsInteractor(
	pinnedEventRepository: PinnedEventRepository,
	paginationInfo: paginationType
) {
	let response = await pinnedEventRepository.listPaginated(paginationInfo);
	return response;
}
