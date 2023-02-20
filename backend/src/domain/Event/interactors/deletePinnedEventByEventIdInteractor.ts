import PinnedEventRepositoryPrisma from '../../PinnedEvent/repository/PinnedEventRepositoryPrisma';

export default async function deletePinnedEventByEventIdInteractor(
	eventId: string,
	pinnedEventRepo: PinnedEventRepositoryPrisma
) {
	let response = await pinnedEventRepo.deleteByEventId(eventId);
	return response;
}
