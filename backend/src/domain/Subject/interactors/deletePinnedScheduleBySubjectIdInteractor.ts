import PinnedScheduleRepositoryPrisma from '../../PinnedSchedule/repository/PinnedScheduleRepositoryPrisma';

export default async function deletePinnedScheduleBySubjectIdInteractor(
	subjectId: string,
	pinnedScheduleRepo: PinnedScheduleRepositoryPrisma
) {
	let response = await pinnedScheduleRepo.deleteBySubjectId(subjectId);
	return response;
}
