import { PinnedEventRepository } from '../../PinnedEvent/repository/PinnedEventRepository';

export default async function listAssociatedSchedulesInteractor(
	pinnedEventRepo: PinnedEventRepository,
	subjectId: string
) {
	let pinnedEvents = await pinnedEventRepo.getBySubjectId(subjectId);
	if (pinnedEvents) {
		return pinnedEvents;
	} else throw new Error('no data');
}
