import { PinnedScheduleRepository } from '../repository/PinnedScheduleRepository';

export default async function listPinnedSchedulesInteractor(
	pinnedScheduleRepository: PinnedScheduleRepository
) {
	let pinnedSchedules = await pinnedScheduleRepository.getAll();
	return pinnedSchedules;
}
