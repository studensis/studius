import SeminarSuggestionEntity from '../model/SeminarSuggestionEntity';
import { SeminarSuggestionRepository } from '../repository/SeminarSuggestionRepository';

export default async function createSeminarSuggestionInteractor(
	seminarSuggestionRepository: SeminarSuggestionRepository,
	seminarSuggestion: SeminarSuggestionEntity
) {
	let seminarSuggestions = await seminarSuggestionRepository.create(
		seminarSuggestion
	);
	return seminarSuggestions;
}
