import { PinnedScheduleEntity } from '../model/PinnedScheduleEntity';
import { PinnedScheduleRepository } from '../repository/PinnedScheduleRepository';

export default async function createPinnedScheduleInteractor(
	pinnedScheduleRepository: PinnedScheduleRepository,
	pinnedSchedule: PinnedScheduleEntity
) {
	let pinnedSchedules = await pinnedScheduleRepository.create(pinnedSchedule);
	return pinnedSchedules;
}
