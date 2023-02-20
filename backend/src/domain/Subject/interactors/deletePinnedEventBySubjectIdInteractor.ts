import PinnedEventRepositoryPrisma from '../../PinnedEvent/repository/PinnedEventRepositoryPrisma';

export default async function deletePinnedEventBySubjectIdInteractor(
	subjectId: string,
	pinnedEventRepo: PinnedEventRepositoryPrisma
) {
	let response = await pinnedEventRepo.deleteBySubjectId(subjectId);
	return response;
}
