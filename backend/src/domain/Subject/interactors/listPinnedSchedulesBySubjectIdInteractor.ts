import { PinnedScheduleRepository } from '../../PinnedSchedule/repository/PinnedScheduleRepository';

export default async function getPinnedScheduleBySubjectIdInteractor(
	pinnedScheduleRepo: PinnedScheduleRepository,
	subjectId: string
) {
	let pinnedSchedules = await pinnedScheduleRepo.getBySubjectId(subjectId);
	return pinnedSchedules;
}
