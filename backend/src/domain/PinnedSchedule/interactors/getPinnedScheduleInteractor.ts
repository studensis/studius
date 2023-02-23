import { PinnedScheduleRepository } from '../repository/PinnedScheduleRepository';

export default async function getPinnedScheduleInteractor(
	pinnedScheduleRepository: PinnedScheduleRepository,
	id: string
) {
	let pinnedSchedules = await pinnedScheduleRepository.getById(id);
	return pinnedSchedules;
}
