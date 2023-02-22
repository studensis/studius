import { PinnedScheduleRepository } from '../../PinnedSchedule/repository/PinnedScheduleRepository';

export default async function deletePinnedScheduleByScheduleIdInteractor(
	scheduleID: string,
	pinnedScheduleRepository: PinnedScheduleRepository
) {
	let response = await pinnedScheduleRepository.deleteByScheduleId(scheduleID);
	return response;
}
