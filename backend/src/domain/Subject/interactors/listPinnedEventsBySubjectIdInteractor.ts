import { PinnedEventRepository } from '../../PinnedEvent/repository/PinnedEventRepository';

export default async function getPinnedEventBySubjectIdInteractor(
	pinnedEventRepo: PinnedEventRepository,
	subjectId: string
) {
	let pinnedEvents = await pinnedEventRepo.getBySubjectId(subjectId);
	return pinnedEvents;
}
