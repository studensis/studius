import { PinnedEventRepository } from '../../PinnedEvent/repository/PinnedEventRepository';

export default async function getPinnedEventBySubjectIdInteractor(
	pinnedEventRepo: PinnedEventRepository,
	input: {
		pageNumber: number;
		objectsPerPage: number;
		subjectId: string;
	}
) {
	let pinnedEvents = await pinnedEventRepo.getBySubjectId(input);
	return pinnedEvents;
}
