import { paginationType } from '../../pagination/paginationObj';

import { PinnedScheduleRepository } from '../repository/PinnedScheduleRepository';

export default async function listPaginatedSchedulesInteractor(
	pinnedSchedulesRepository: PinnedScheduleRepository,
	paginationInfo: paginationType
) {
	let response = await pinnedSchedulesRepository.listPaginated(paginationInfo);
	return response;
}
