import { SeminarSuggestionRepository } from '../../SeminarSuggestion/repository/SeminarSuggestionRepository';

export default async function getSubjectInteractor(
	seminarSuggestionRepo: SeminarSuggestionRepository,
	id: string
) {
	let subject = await seminarSuggestionRepo.listPinnedEventsBySubjectId(id);
	return subject;
}
